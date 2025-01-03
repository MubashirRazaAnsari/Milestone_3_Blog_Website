'use client';
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createIdea } from "@/lib/action";

const ideaForm = () => {
  const { toast} = useToast()
  const router = useRouter()
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>("")
  const handleFormSubmit = async (previousState : any , formData : FormData) => {
    try{
      const formValues ={
        ideaTitle: formData.get('ideaTitle') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        ideaImage:formData.get('ideaImage') as string,
        pitch,


      }
      await formSchema.parseAsync(formValues);
      console.log(formValues)
      const result = await createIdea(previousState, formData , pitch);
     
      if (result.status == 'SUCCESS'){
        toast( {
          title: "SUCCESS!" ,
          description: "Your Idea has been created successfully",
          

        })
        router.push(`/idea/${result._id}`)
      }
      return result;
    }
    catch(error){
      if(error instanceof z.ZodError ){
        const fieldError = error.flatten().fieldErrors;
        setError(fieldError as unknown as Record<string ,string>);
        toast( {
          title: "Error" ,
          description: "Please check your inputs and try again",
          variant:'destructive',

        })

        return {...previousState , error : "Validation Failed" , status: "ERROR"}
      }
      toast( {
        title: "Error" ,
        description: "An Unexpected error has occurred",
        variant:'destructive',

      })
      return{
        ...previousState,
        error:'An unexpected error has occurred',
        status:"ERROR"
      }

    }
  }
  const [state , formAction , isPending] = useActionState(handleFormSubmit ,{error: '',
  status: "INITIAL",
  })


  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          type="text"
          id="ideaTitle"
          name="ideaTitle"
          className="startup-form_input"
          required
          placeholder="Title"
          data-ms-editor="true"
          spellCheck="false"
        />
        {error.ideaTitle && <p className="startup-form_error">{error.ideaTitle}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Idea Description"
          data-ms-editor="true"
          spellCheck="false"
        />
        {error.description && <p className="startup-form_error">{error.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Idea Category
        </label>
        <Input
          type="text"
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Idea Category i.e Tech, AI, etc"
          data-ms-editor="true"
          spellCheck="false"
        />
        {error.category && <p className="startup-form_error">{error.category}</p>}
      </div>
      <div>
        <label htmlFor="ideaImage" className="startup-form_label">
          Idea Image URL
        </label>
        <Input
          type="text"
          id="ideaImage"
          name="ideaImage"
          className="startup-form_input"
          required
          placeholder="Idea Image URL"
          data-ms-editor="true"
          spellCheck="false"
        />
        {error.ideaImage && <p className="startup-form_error">{error.ideaImage}</p>}
      </div>
      <div data-color-mode='light'>
        <label className="startup-form_label">
          Idea Pitch
        </label>
        <MDEditor value={pitch} onChange={(value) => setPitch(value || "")} id="pitch" preview="edit" height={300} style={{borderRadius: 20 ,overflow: "hidden"}}
        
        textareaProps={{
          placeholder: "Briefly Describe your Idea to convey your message to the world"
        }}
        previewOptions={{
          disallowedElements: ["style"]
        }}
        data-ms-editor="true"
        spellCheck="false"
         />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>
      <Button type="submit" className="startup-form_btn" disabled={isPending}>{isPending ? "Submitting..." : "Submit"} <Send className="size-6 ml-2" /></Button>

    </form>
  );
};

export default ideaForm;
