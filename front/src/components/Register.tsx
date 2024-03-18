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
import { FadeLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultProfile from "../../public/defaultProfile.svg";
import { useState } from "react";
import { uploadFile } from "@/services/supabaseStorage";
import { IuserToRegister } from "@/interfaces/IUser";
import { useToast } from "@/components/ui/use-toast";
import { register } from "@/services/auth";
import registerSchema from "@/zod/registerSchema";

const Register = () => {
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const [birthdate, setBirthdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      nDni: "",
      birthdate: new Date(),
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const { username, firstName, lastName, phone, nDni, password } = values;
    let profile_image = null;
    if (!imageProfile) {
      profile_image = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      console.log("paso por aqui");
    } else {
      profile_image = await uploadFile(imageProfile).catch((error) => {
        console.log(error);
      });
    }

    const [day, month, year] = birthdate.split("-");

    const userToRegister: IuserToRegister = {
      user: {
        username,
        first_name: firstName,
        last_name: lastName,
        phone,
        profile_image: profile_image ? profile_image : "",
        role: "Client",
        nDni,
        birthdate: `${day}-${month}-${year}`,
      },
      credential: {
        password,
      },
    };
    register(userToRegister)
      .then(() => {
        navigate("/auth/login");
        toast({
          variant: "default",
          title: "Register Success",
          description: "User was registered with exit",
          className: "bg-green-800 text-white",
          duration: 2000,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Invalid User",
          description: error.response.data.error,
          duration: 3000,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-row my-auto">
      <Card className="w-full flex flex-col mt-4 mx-auto  md:w-8/12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="space-y-8"
            >
              <div className="block md:flex w-full  justify-around">
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="maria" type="text" {...field} />
                      </FormControl>
                      <FormDescription>This is your first name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Rodriguez" type="text" {...field} />
                      </FormControl>
                      <FormDescription>This is your last name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="block md:flex w-full  justify-around">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="3124322345" type="tel" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your phone number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nDni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input placeholder="10543432" type="text" {...field} />
                      </FormControl>
                      <FormDescription>This is your DNI number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={() => (
                    <FormItem className="flex flex-col min-w-44">
                      <FormLabel>Birth date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setBirthdate(e.target.value);
                          }}
                          required
                        />
                      </FormControl>
                      <FormDescription>This is your Birth date</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="block md:flex w-full  justify-around">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="***********************"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your private key.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="***********************"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your private key.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-center justify-around">
                  <Avatar className="z-1 absolute mb-5">
                    <AvatarImage src={defaultProfile} />
                    <AvatarFallback>BU</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    className="z-2 relative opacity-0 w-24 mb-[-20px]"
                    onChange={(event) => {
                      const file = event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null;
                      setImageProfile(file);
                    }}
                  />
                  <p className="relative text-slate-600 text-xs ">
                    If you want upload you profile photo
                  </p>
                </div>
              </div>
              <Button className="w-full" type="submit">
                Sign up
              </Button>
            </form>
          </Form>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-gray-700">
              Don't have an account?
              <Link className=" text-blue-600 hover:underline" to="/auth/login">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </Card>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
          <FadeLoader className="text-center" />
        </div>
      ) : null}
      -
    </div>
  );
};

export default Register;
