"use client"
import { customizeOptionsSchema } from '@/validators/customize-design-validator'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TextElement } from './dummyTextElements'

function DesginCustomizeForm({textElements, setTextElements}: {textElements: TextElement[], setTextElements: React.Dispatch<React.SetStateAction<TextElement[]>>}) {
    const form = useForm()

    const onSubmit = (values: any)=> {
            console.log(values)
    }
    const changeTextElement = (id: string, newText: string) => {
      // Find the index of the element to change
      const index = textElements.findIndex((ele) => ele.id === id);
      
      // If the element is found, update its content
      if (index !== -1) {
        const updatedElements = [...textElements]; // Create a copy of the array
        updatedElements[index].content = newText; // Update the specific element
    
        // Update the state with the new array
        setTextElements(updatedElements);
      } else {
        console.error(`Element with id ${id} not found.`);
      }
    };
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {textElements.map((ele) => 
              <FormField
              key={ele.id}
              control={form.control}
              name={ele.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ele.title}</FormLabel>
                  <FormControl>
                    <Input placeholder={ele.content} {...field} onChange={(e)=> changeTextElement(ele.id, e.target.value)} />
                  </FormControl>
                  <FormDescription>
                    Edit the {ele.title} on the design.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default DesginCustomizeForm