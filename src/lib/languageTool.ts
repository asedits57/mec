import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LanguageToolRequest {
  tool: "translate" | "grammar" | "improve" | "spelling";
  text: string;
  fromLang?: string;
}

export async function callLanguageTool({ tool, text, fromLang }: LanguageToolRequest): Promise<string> {
  const { data, error } = await supabase.functions.invoke("language-tool", {
    body: { tool, text, fromLang },
  });

  if (error) {
    const msg = error.message || "Something went wrong";
    toast.error(msg);
    throw new Error(msg);
  }

  if (data?.error) {
    toast.error(data.error);
    throw new Error(data.error);
  }

  return data.result;
}
