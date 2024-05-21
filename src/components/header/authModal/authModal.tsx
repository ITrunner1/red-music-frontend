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
import { useAuth } from "@/store/hooks/UseAuth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActions } from "@/store/hooks/useActions";
import { register } from "@/actions/user.actions";
import { IEmailPassword } from "@/interfaces/auth.interface";
import { useAuthRedirect } from "./useAuthRedirect";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(5).max(15, {
    message: "Password must be at least 5 characters and maximum 15.",      
  }),  
})

const authModal: FC = () => { 
  useAuthRedirect()

  const [type, setType] = useState<'login' | 'register'>('login')
   
  const { isLoading } = useAuth()

  const { login, register } = useActions()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),    
    defaultValues: {
      email: "",
      password: "",   
    },
  });  

  const onSubmit: SubmitHandler<IEmailPassword> = data => {
    if (type === 'login')
      login(data) 
    else 
      register(data)    
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
            <DialogTitle>{type === 'login' ? 'Логин' : 'Регистрация'}</DialogTitle>
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
              <DialogFooter>    
                             
                <Button 
                    type="submit" variant="outline"                                     
                    > 
                      {type === 'login' ? 'Логин' : 'Регистрация2'}
                </Button>                           
              </DialogFooter>                            
            </form>
          </Form> 
          <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setType(type === 'login' ? 'register' : 'login')}                 
                    >
                      {type === 'register' ? 'Логин' : 'Регистрация'}
                </Button>                                         
        </DialogContent>
      </Dialog>
   )
}

export default authModal;