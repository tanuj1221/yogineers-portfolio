// src/components/features-section-demo-3.tsx
import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import DrawUnderlineButton from "@/components/AnimatedComponents/DrawUnderlineButton";
import { 
  SiReact, 
  SiExpo, 
  SiSwift, 
  SiKotlin, 
  SiFlutter, 
  SiFirebase,
  SiAndroid,
  SiApple,
  SiIonic,
  SiTypescript
} from 'react-icons/si';


export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Custom Web Development",
      description:
        "Build modern, responsive web applications with cutting-edge technologies like React, Next.js, and TypeScript for exceptional user experiences.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r border-orange-500 dark:border-orange-500",
    },
    {
      title: "Mobile App Development",
      description:
        "Create cross-platform mobile applications for iOS and Android with native performance using React Native and Flutter.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-orange-500 dark:border-orange-500",
    },
    {
      title: "Watch Our Portfolio",
      description:
        "Discover our successful projects and see how we've helped businesses transform their digital presence through innovative solutions.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r border-orange-500 dark:border-orange-500",
    },
    {
      title: "Global Cloud Solutions",
      description:
        "Deploy scalable applications worldwide with our cloud infrastructure expertise using AWS, Docker, and Kubernetes for reliable performance.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-white dark:bg-background">
      <div className="px-8">
        <div className="flex justify-center">
          <DrawUnderlineButton onBack={true} marginTop="32px" width="90%" thickness={3} autoAnimate={true}>
            <h2 className="text-display-lg mb-6 text-foreground text-center">
              Comprehensive IT Solutions
            </h2>
          </DrawUnderlineButton>
        </div>

        <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 text-center">
          From custom web applications to AI-powered solutions, we deliver end-to-end 
          technology services that transform your business ideas into powerful digital experiences.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border xl:border-orange-500 rounded-md dark:border-orange-500">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          {/* TODO */}
          <img
            src="https://ui.aceternity.com/linear.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <a
      href="https://www.linkedin.com/company/yogineers-technologies-private-limited/"
      target="__blank"
      className="relative flex gap-10  h-full group/image"
    >
      <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
          <img
            src="https://media.discordapp.net/attachments/1406858253316526162/1439933959327973509/ABS2GSkeNX9tAWJU9QecqBTjAlGIUNc8RkNOMhTFdRc0v5z4qupL2k1PG2YOFHn9xqYS030QkPiuR5fY8bd3te2-oteA_J6UkGWhBBIXc3HRFv2YJ8E-Ws91429qLRV8YuwwXOGt_2t9cI14suJPDh_492fRX_-wkzeuqXTdDy0wLaoATz-bXAs1024-rj.png?ex=691c5280&is=691b0100&hm=173143daaef62ab69147e0a99fb86f37d1229c2dc2bd556656aa5037a8fa6f64&=&format=webp&quality=lossless&width=821&height=930"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonTwo = () => {
  const mobileDevTechnologies = [
    { icon: SiReact, name: "React Native", color: "#61DAFB" },
    { icon: SiExpo, name: "Expo", color: "#000020" },
    { icon: SiFlutter, name: "Flutter", color: "#02569B" },
    { icon: SiSwift, name: "Swift", color: "#FA7343" },
    { icon: SiKotlin, name: "Kotlin", color: "#7F52FF" },
    { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
    { icon: SiAndroid, name: "Android", color: "#3DDC84" },
    { icon: SiApple, name: "iOS", color: "#000000" },
    { icon: SiIonic, name: "Ionic", color: "#3880FF" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      {/* TODO */}
      <div className="flex flex-row -ml-20">
        {mobileDevTechnologies.slice(0, 5).map((tech, idx) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              variants={imageVariants}
              key={"tech-first-" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              whileHover="whileHover"
              whileTap="whileTap"
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 border-orange-500 dark:border-orange-500 border shrink-0 overflow-hidden"
            >
              <div className="rounded-lg h-20 w-20 md:h-40 md:w-40 flex items-center justify-center bg-white dark:bg-neutral-900 shadow-sm">
                <IconComponent 
                  className="h-10 w-10 md:h-16 md:w-16" 
                  style={{ color: tech.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-row">
        {mobileDevTechnologies.slice(5, 10).map((tech, idx) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={"tech-second-" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              variants={imageVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 border-orange-500 dark:border-orange-500 border shrink-0 overflow-hidden"
            >
              <div className="rounded-lg h-20 w-20 md:h-40 md:w-40 flex items-center justify-center bg-white dark:bg-neutral-900 shadow-sm">
                <IconComponent 
                  className="h-10 w-10 md:h-16 md:w-16" 
                  style={{ color: tech.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent  h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black  to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};