"use client";

import { useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  MeshTransmissionMaterial,
  Text,
  Sparkles,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface KeycapSceneProps {
  onPressComplete: () => void;
}

export interface KeycapHandle {
  press: () => void;
}

/**
 * Full 3D mechanical keycap: Base plate -> Switch -> Keycap.
 * Idle float + mouse-tilt run every frame (useFrame).
 * Hover lift + the mechanical press sequence run on GSAP timelines.
 * Exposes `press()` via ref so the DOM-level ENTER keydown listener
 * (in IntroScreen) can trigger the exact same sequence as a click.
 */
function KeycapScene({ onPressComplete }: KeycapSceneProps, ref: React.Ref<KeycapHandle>) {
  const outerRef = useRef<THREE.Group>(null); // GSAP controlled (hover lift + press)
  const innerRef = useRef<THREE.Group>(null); // useFrame controlled (idle float + tilt)
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const rippleMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const arrowRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const pressedRef = useRef(false);
  const clock = useRef(0);

  // ---- Continuous idle animation + mouse-follow tilt (useFrame) ----
  useFrame((state, delta) => {
    clock.current += delta;

    if (innerRef.current && !pressedRef.current) {
      // gentle breathing float
      innerRef.current.position.y = Math.sin(clock.current * 1.4) * 0.09 + 0.05;
      innerRef.current.rotation.z = Math.sin(clock.current * 1.1) * 0.025;

      // mouse-follow tilt (smooth lerp toward pointer)
      const targetX = state.pointer.y * 0.18;
      const targetY = state.pointer.x * -0.22;
      innerRef.current.rotation.x = THREE.MathUtils.lerp(
        innerRef.current.rotation.x,
        targetX,
        0.06
      );
      innerRef.current.rotation.y = THREE.MathUtils.lerp(
        innerRef.current.rotation.y,
        targetY,
        0.06
      );
    }

    // glow pulse (breathing)
    if (glowMatRef.current) {
      const pulse = 0.35 + Math.sin(clock.current * 2) * 0.15 + (hovered ? 0.25 : 0);
      glowMatRef.current.opacity = pressedRef.current ? 0.12 : pulse;
    }

    // arrow bounce
    if (arrowRef.current) {
      arrowRef.current.position.x = 0.62 + Math.sin(clock.current * 2.4) * 0.04;
    }
  });

  // ---- Hover: GSAP lift + glow intensify ----
  const handlePointerOver = useCallback(() => {
    if (pressedRef.current) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
    if (outerRef.current) {
      gsap.to(outerRef.current.position, {
        y: 0.12,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(outerRef.current.scale, {
        x: 1.045,
        y: 1.045,
        z: 1.045,
        duration: 0.45,
        ease: "power3.out",
      });
    }
  }, []);

  const handlePointerOut = useCallback(() => {
    if (pressedRef.current) return;
    setHovered(false);
    document.body.style.cursor = "auto";
    if (outerRef.current) {
      gsap.to(outerRef.current.position, {
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(outerRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    }
  }, []);

  // ---- Click: GSAP mechanical press timeline ----
  const handleClick = useCallback(() => {
    if (pressedRef.current || !outerRef.current) return;
    pressedRef.current = true;
    document.body.style.cursor = "auto";

    const tl = gsap.timeline();

    // 1. Keycap plunges down toward the switch
    tl.to(outerRef.current.position, {
      y: -0.32,
      duration: 0.13,
      ease: "power2.in",
    });
    tl.to(
      outerRef.current.scale,
      { x: 0.97, y: 0.9, z: 0.97, duration: 0.13, ease: "power2.in" },
      "<"
    );

    // 2. Glow dips + ripple fires from the switch
    tl.call(() => {
      if (rippleRef.current && rippleMatRef.current) {
        rippleRef.current.scale.set(0.1, 0.1, 0.1);
        rippleMatRef.current.opacity = 0.8;
        gsap.to(rippleRef.current.scale, {
          x: 4,
          y: 4,
          z: 4,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(rippleMatRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    // 3. Keycap bounces back up (mechanical rebound) and overshoots slightly
    tl.to(outerRef.current.position, {
      y: 0.06,
      duration: 0.28,
      ease: "back.out(2.5)",
    });
    tl.to(
      outerRef.current.scale,
      { x: 1, y: 1, z: 1, duration: 0.28, ease: "back.out(2.5)" },
      "<"
    );

    // 4. Settle + hand off to the DOM-level reveal (Framer Motion takes over)
    tl.to(outerRef.current.position, {
      y: 0,
      duration: 0.18,
      ease: "power2.out",
      onComplete: () => onPressComplete(),
    });
  }, [onPressComplete]);

  useImperativeHandle(ref, () => ({
    press: () => handleClick(),
  }));

  return (
    <group>
      {/* Controlled, HDR-free environment lighting (no external asset fetch) */}
      <Environment resolution={256}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Lightformer
            intensity={2}
            color="#667eea"
            position={[3, 2, -2]}
            scale={[4, 3, 1]}
          />
          <Lightformer
            intensity={1.2}
            color="#764ba2"
            position={[-3, -1, 2]}
            scale={[3, 2, 1]}
          />
          <Lightformer intensity={0.6} color="#ffffff" position={[0, 4, 3]} scale={[3, 3, 1]} />
        </group>
      </Environment>

      <ambientLight intensity={0.35} />
      <pointLight position={[2, 3, 3]} intensity={12} color="#8fa2f0" distance={8} />
      <pointLight position={[-2, -1, 2]} intensity={6} color="#764ba2" distance={8} />

      {/* ---- Base plate ---- */}
      <RoundedBox args={[2.6, 0.28, 2.2]} radius={0.08} position={[0, -1.1, 0]}>
        <meshStandardMaterial color="#12182b" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[2.5, 0.03, 2.1]} radius={0.06} position={[0, -0.96, 0]}>
        <meshStandardMaterial
          color="#1c2444"
          metalness={0.5}
          roughness={0.4}
          emissive="#667eea"
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* ---- Switch housing + stem ---- */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.55]} />
        <meshStandardMaterial color="#161b2e" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.24, 0.22, 0.24]} />
        <meshStandardMaterial
          color="#667eea"
          metalness={0.2}
          roughness={0.3}
          emissive="#667eea"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ---- Ripple (fires on click, sits on the base) ---- */}
      <mesh ref={rippleRef} position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
        <ringGeometry args={[0.3, 0.42, 48]} />
        <meshBasicMaterial
          ref={rippleMatRef}
          color="#8fa2f0"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ---- Ambient occlusion / contact shadow ---- */}
      <ContactShadows
        position={[0, -1.24, 0]}
        opacity={0.55}
        scale={4}
        blur={2.4}
        far={1.2}
        color="#050914"
      />

      {/* ---- Ambient particles around the keycap (not a "rain") ---- */}
      <Sparkles
        count={40}
        scale={[3.2, 2.2, 3.2]}
        size={2}
        speed={0.18}
        opacity={0.35}
        color="#8fa2f0"
        position={[0, 0.2, 0]}
      />

      {/* ---- Outer group: GSAP controlled (hover + press) ---- */}
      <group ref={outerRef}>
        {/* Inner group: useFrame controlled (idle float + tilt) */}
        <group ref={innerRef}>
          {/* Soft blue glow behind the keycap */}
          <mesh ref={glowRef} position={[0, 0, -0.3]}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial
              ref={glowMatRef}
              color="#667eea"
              transparent
              opacity={0.35}
              depthWrite={false}
            />
          </mesh>

          {/* Keycap body - real 3D rounded box, bevelled like an actual keycap.
              A <group> (not <mesh>) hosts the pointer handlers: R3F bubbles
              pointer events up from whichever child mesh is actually hit. */}
          <group
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
          >
            <RoundedBox args={[1.5, 0.55, 1.5]} radius={0.14} smoothness={6}>
              <MeshTransmissionMaterial
                backside
                samples={6}
                thickness={0.6}
                roughness={0.12}
                transmission={0.92}
                ior={1.25}
                chromaticAberration={0.02}
                distortion={0.1}
                distortionScale={0.2}
                temporalDistortion={0.1}
                color="#c7d2fe"
                attenuationColor="#667eea"
                attenuationDistance={1.2}
              />
            </RoundedBox>

            {/* Bevel highlight ring around the top edge */}
            <mesh position={[0, 0.275, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.62, 0.7, 32, 1]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
            </mesh>

            {/* Text label */}
            <Text
              position={[0, 0.3, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.24}
              letterSpacing={0.08}
              color="#eef1ff"
              anchorX="center"
              anchorY="middle"
            >
              ENTER
            </Text>

            {/* Geometric arrow (not a font glyph, so it always renders) */}
            <group ref={arrowRef} position={[0.62, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh position={[-0.05, 0, 0]}>
                <boxGeometry args={[0.16, 0.045, 0.01]} />
                <meshBasicMaterial color="#c7d2fe" />
              </mesh>
              <mesh position={[0.06, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.06, 0.12, 3]} />
                <meshBasicMaterial color="#c7d2fe" />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default forwardRef(KeycapScene);
