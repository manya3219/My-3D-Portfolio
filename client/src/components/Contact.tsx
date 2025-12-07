import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-orbitron font-bold text-white mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-gray-400 font-rajdhani text-lg mb-12">
              Have a project in mind or want to discuss the latest tech? I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <a href="mailto:yadavmanya1902@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Email</p>
                  <p className="text-white font-rajdhani text-lg group-hover:text-primary transition-colors">yadavmanya1902@gmail.com</p>
                </div>
              </a>

              <a href="tel:9253615701" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Phone</p>
                  <p className="text-white font-rajdhani text-lg group-hover:text-secondary transition-colors">9253615701</p>
                </div>
              </a>

              <div className="flex gap-4 pt-4">
                <a 
                  href="https://www.linkedin.com/in/manya-yadav01/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/manya3219" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />
             
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-rajdhani">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-black/50 border-white/10 focus:border-primary text-white font-rajdhani h-12" />
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
                      <FormLabel className="text-white font-rajdhani">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-black/50 border-white/10 focus:border-primary text-white font-rajdhani h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-rajdhani">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          {...field} 
                          className="bg-black/50 border-white/10 focus:border-primary text-white font-rajdhani min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white font-orbitron font-bold h-12 hover:opacity-90 transition-opacity">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
