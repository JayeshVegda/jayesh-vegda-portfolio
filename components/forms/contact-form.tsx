"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/hooks/use-modal-store";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must contain at least 3 characters.",
  }),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, {
    message: "Please write something more descriptive.",
  }),
  social: z.string().url().optional().or(z.literal("")),
});

export function ContactForm() {
  const storeModal = useModalStore();
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      social: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      form.reset();

          if (response.status === 200) {
            storeModal.onOpen({
              title: "Thankyou!",
              description:
                "Your message has been received! I appreciate your contact and will get back to you shortly.",
              icon: Icons.successAnimated,
            });
          }
        } catch (err) {
          // Handle error silently or show user-friendly error message
          storeModal.onOpen({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            icon: Icons.warning,
          });
        }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl contact-unified-card p-6 md:p-8 w-full h-full">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        <div className="relative z-10 h-full flex flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex-1 flex flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90 font-medium text-sm mb-2">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        {...field}
                        className={cn(
                          "contact-input rounded-xl h-11 px-4 text-sm",
                          "placeholder:text-muted-foreground/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90 font-medium text-sm mb-2">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter your email" 
                        {...field}
                        className={cn(
                          "contact-input rounded-xl h-11 px-4 text-sm",
                          "placeholder:text-muted-foreground/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel className="text-foreground/90 font-medium text-sm mb-2">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your message" 
                        {...field}
                        className={cn(
                          "contact-input rounded-xl min-h-[100px] flex-1 px-4 py-3 resize-none text-sm",
                          "placeholder:text-muted-foreground/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90 font-medium text-sm mb-2">
                      Social Profile <span className="text-muted-foreground/70 text-xs font-normal">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="Link to your LinkedIn, Twitter, etc." 
                        {...field}
                        className={cn(
                          "contact-input rounded-xl h-11 px-4 text-sm",
                          "placeholder:text-muted-foreground/50"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-auto pt-2">
                <Button 
                  type="submit" 
                  className={cn(
                    "contact-floating-button rounded-xl h-11 px-8",
                    "text-foreground font-semibold text-sm",
                    "hover:translate-y-[-2px] transition-all"
                  )}
                >
                  Send Message
                  <Icons.chevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
