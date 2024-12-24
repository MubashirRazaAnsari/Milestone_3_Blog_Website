import {z} from 'zod'

export const formSchema = z.object({
    ideaTitle: z.string().min(3).max(100),
    description:z.string().min(20).max(500),
    category:z.string().min(3).max(20),
    ideaImage:z.string().url().refine(
        async (url) => {
          try {
            // Fetch the URL with a HEAD request to check if it is accessible
            const res = await fetch(url, { method: "HEAD" });
      
            // Check if the response is okay and if the content type is an image
            const contentType = res.headers.get("content-type");
            return res.ok && contentType?.startsWith("image/");
          } catch {
            // If any error occurs, the URL is not valid
            return false;
          }
        },
        {
          message: "The provided URL is not a valid image or is inaccessible.",
        }
      
    
    ),
    pitch: z.string().min(50)
})