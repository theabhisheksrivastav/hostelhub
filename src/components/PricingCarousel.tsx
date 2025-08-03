// import { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button"

// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// import {
 
//   Check,
  
// } from "lucide-react"

// type PricingPlan = {
//   name: string;
//   price: string;
//   period?: string;
//   description: string;
//   features: string[];
//   popular?: boolean;
// };

// interface PricingCarouselProps {
//   pricingPlans: PricingPlan[];
// }

// export default function PricingCarousel({ pricingPlans }: PricingCarouselProps) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const scrollAmount = 320; // Adjust based on card width
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   const handleClick = (plan: PricingPlan) => {
//     // TODO: Implement modal opening logic here
//     alert(`Selected plan: ${plan.name}`);
//   };

//   return (
//     <div className="relative w-full">
//       {/* Arrow Buttons */}
//       {pricingPlans.length > 3 && (
//         <>
//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
//         {pricingPlans.map((plan: PricingPlan, index: number) => (
//           <div
//             key={index}
//             className={`min-w-[300px] max-w-[320px] flex-shrink-0 snap-start relative bg-white shadow-sm border-gray-200 rounded-lg`}
//           >
//             {plan.popular && (
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <Badge className="bg-indigo-600 text-white">Most Popular</Badge>
//               </div>
//             )}
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl">{plan.name}</CardTitle>
//               <div className="mt-4">
//                 <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                 {plan.price !== "Custom" && <span className="text-gray-500">/{plan.period}</span>}
//               </div>
//               <p className="text-gray-600 mt-2">{plan.description}</p>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <ul className="space-y-3">
//                 {plan.features.map((feature: string, featureIndex: number) => (
//                   <li key={featureIndex} className="flex items-center gap-3">
//                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-600">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Button
//                 className={`w-full mt-6 ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
//                 onClick={() => handleClick(plan)} // Should open modal
//               >
//                 {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
//               </Button>
//             </CardContent>
//           </div>
//         ))}
//             <CardContent className="space-y-4">
//               <ul className="space-y-3">
//                 {plan.features.map((feature, featureIndex) => (
//                   <li key={featureIndex} className="flex items-center gap-3">
//                     <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-600">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Button
//                 className={`w-full mt-6 ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
//                 onClick={() => handleClick(plan)} // Should open modal
//               >
//                 {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
//               </Button>
//             </CardContent>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
