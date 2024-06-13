"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import WhyPremium from "./WhyPremium";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
const plan = [
  {
    label: "Monthly",
    value: "1.99",
    currency: "$",
    lookup_id: "mt_live_monthly_look_key",
  },
];
const PricingSection = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const { data: session, status } = useSession();

  console.log(session?.user?.email,'sessionsession')
  const parseQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id") || "");
    } else if (query.get("canceled")) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  };

  useEffect(() => {
    parseQueryParams();
  }, [sessionId]);


  const handleClick = async () => {
    try {
      const response = await axios.post("/api/create-checkout-session", {
        // lookup_key: plan[0].lookup_id,
        email: session?.user?.email,
        name: session?.user?.name
        // email : 'test@gmail.com'
      });
      console.log(response,"response")
      router.replace(response.data.url);
    } catch (error : any) {
      console.error("Error creating checkout session:", error);
      setMessage("An error occurred. Please try again.");
      toast.error(error?.response?.data?.error?.message)
    }
  };
  return (
    <>
      <section
        className="w-full flex justify-center items-center py-12  md:py-20 lg:py-24"
        id="pricing"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Flexible Subscription Options
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that best suits your needs and budget. Upgrade
                or downgrade anytime.
              </p>
            </div>
            <div className="flex">
              {/* <Card className="flex flex-col h-96 justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Get started with our basic features.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">$0</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      per month
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                  <Link
                    className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                    href="#"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </Card> */}
              <Card className="flex flex-col h-96 justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Unlock advanced features and tools.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">$1.99</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      per month
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleClick}
                  >
                    Upgrade to Pro
                  </Button>
                  <Link
                    className="text-sm font-medium text-gray-900 underline underline-offset-4  hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                    href="#"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </Card>
              {/* <Card className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Tailored solutions for large teams.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">Contact Us</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      Custom pricing available
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                  <Link
                    className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                    href="#"
                  >
                    Manage Subscription
                  </Link>
                </div>
              </Card> */}
            </div>
          </div>
        </div>
      </section>
      <WhyPremium/>
      <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold text-lg">
                    How do I upgrade to ClickIn2Click Premium?
                  </AccordionTrigger>
                  <AccordionContent>
                    Your extension will be automatically upgraded once you
                    purchase ClickIn2Click Premium. And you can immediately try
                    out ClickIn2Click Premium features by enabling them from the
                    General Settings page. If you’d like to redeem your upgrade
                    on additional computers you use, please see this article.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-semibold text-lg">
                    Why isn’t ClickIn2Click Premium free?
                  </AccordionTrigger>
                  <AccordionContent>
                    ClickIn2Click Premium provides customization features that
                    have been requested by users like you. To build these
                    features, we need more developer resources that can be
                    supported by one-time donations. Please note that this
                    upgrade doesn’t provide additional ad blocking. Ad blocking
                    has always been free and we intend to keep it that way!{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-semibold text-lg">
                    How can I learn more about ClickIn2Click Premium?
                  </AccordionTrigger>
                  <AccordionContent>
                    Please visit our Help Center to learn more about Adblock
                    Plus Premium.{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
