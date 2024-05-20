'use client';
import { FC, useState } from "react";
import { FaUserCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/UseAuth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(5).max(15, {
    message: "Password must be at least 5 characters and maximum 15.",      
  }),
  passwordConfirm: z.string()
}).refine((data) => {
  return data.password === data.passwordConfirm
},{
  message: "Password do not match",
  path: ["passwordConfirm"]
}) 

const authModal: FC = () => { 
   const [type, setType] = useState<'login' | 'register'>('login')
   
  //  const [isLoading] = useAuth()

  // const {register, formState: {errors}, handleSubmit} = useForm<IAuthFields>({
  //   mode: 'onChange',  
  // })  
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  

  const onSubmit = () => {
    console.log("SUCCESS")
  }  

  

   return (     
      <Dialog>
        <DialogTrigger asChild>
        <Button size="icon" variant="link" className="mx-2 text-3xl opacity-75 hover:opacity-100">          
          <FaUserCircle fill='#FFFFFF' />
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Логин</DialogTitle>
            <DialogDescription>
            Войдите в свою учетную запись. 
            </DialogDescription>
          </DialogHeader> 

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />                      
                    </FormControl>                 
                    <FormDescription>  
                      Write your email                    
                    </FormDescription>
                    <FormMessage />
                  </FormItem>                  
                )}                
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />                      
                    </FormControl>                 
                    <FormDescription>  
                      Write your password                   
                    </FormDescription>
                    <FormMessage />
                  </FormItem>                  
                )}                
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />                      
                    </FormControl>                 
                    <FormDescription>  
                      Confirm your pasword                   
                    </FormDescription>
                    <FormMessage />
                  </FormItem>                  
                )}                
              />

              <DialogFooter>
              Если у вас нет учетной записи, то вам следует зарегистрироваться
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
   )
}

export default authModal;