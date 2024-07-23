import { PerspectiveCamera, View } from "@react-three/drei";

import IPhone from "./IPhone";
import { Suspense } from "react";

import { AmbientLight } from "three";

const ModelView = ({
   index,
   groupRef,
   gsapType,
   controlRef,
   setRotationState,
   size,
   item,
}) => {
   return (
      <View
         index={index}
         id={gsapType}
         className={`w-full h-full absolute ${
            index === 2 ? "right-[-100%]" : ""
         }`}
      >
         {/* Ambient Light */}
         <ambientLight intensity={0.3} />

         <PerspectiveCamera makeDefault position={[0, 0, 4]} />

         <Lights />

         <Suspense fallback={<div>Loading</div>}>
            <IPhone />
         </Suspense>
      </View>
   );
};

export default ModelView;
