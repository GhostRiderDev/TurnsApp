import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { setLogedUser } from "@/reducer/userReducer";
import ICredential from "@/interface/credential";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "./ui/use-toast";

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof loginSchema>) => {
    const credentials: ICredential = {
      ...values,
    };
    const response = await dispatch(setLogedUser(credentials));
    if (!response.payload) {
      toast({
        variant: "destructive",
        title: "Invalid User",
        description: "Invalid credentials",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    navigate("/user");
  };

  return (
    <div className="flex flex-row">
      <div className=" h-[89vh] bg-slate-950 md:w-1/2 left-part"></div>
      <Card className="w-full flex flex-col my-auto mx-auto max-w-sm md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="maria@gmail.com"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pasword</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********************"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your private key.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sigin</Button>
            </form>
          </Form>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              Don't have an account?
              <Link
                className=" text-blue-600 hover:underline"
                to="/auth/register"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
