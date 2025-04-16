import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, provider } from "@/config/Firebase";
import { IMAGES } from "@/data/images";
import { paths } from "@/data/path";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigator = useRouter();

  const handleSubmitGitHub = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigator.push(paths.HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="w-[450px] h-fit bg-white dark:bg-dark-2 gap-4 px-2 py-6">
      <CardHeader>
        <div className="flex items-center gap-2 justify-center ">
          <Image width={40} height={40} src={IMAGES.LOGO} alt="logo.png" />
          <h4 className="text-4xl font-bold text-primary">CodeFlow</h4>
        </div>
        <CardTitle className="text-left text-xl font-bold mt-4">
          Welcome to CodeFlow 👋🏻
        </CardTitle>
        <CardDescription className="text-left text-base font-light">
          Please sign-in to your account and start the adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="email" className="text-left font-semibold mb-2">
            Email
          </Label>
          <Input
            className="w-full mb-4 h-12"
            placeholder="Email"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-left font-semibold mb-2">
            Password
          </Label>
          <Input
            className="w-full mb-4 h-12"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label
              htmlFor="password"
              className="text-left text-sm leading-none font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remenber me
            </Label>
          </div>
          <Link href={"/auth/forgot-password"}>
            <span className="text-sm text-primary hover:text-primary/80 cursor-pointer">
              Forgot password?
            </span>
          </Link>
        </div>

        <Button
          onClick={() => console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)}
          className="w-full h-12 mt-8 bg-primary text-white hover:bg-primary/80"
        >
          Sign In
        </Button>

        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Don`t have an account yet?
          </span>
          <Link href={paths.HOME}>
            <span className="text-sm text-primary hover:text-primary/80 cursor-pointer ml-1">
              Sign Up
            </span>
          </Link>
        </div>

        <div className="relative w-full text-center">
          <span className="z-10p-2">or</span>
        </div>

        <div>
          <Button
            onClick={() => handleSubmitGitHub()}
            className="w-full h-12 mt-4 bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Image
              src={IMAGES.GITHUB}
              alt="google"
              width={30}
              height={30}
              className="object-cover w-6 h-6 mr-2"
            />
            Sign In with GitHub
          </Button>

          {/* <Button className="w-full h-12 mt-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Image
              src={IMAGES.GOOGLE}
              alt="google"
              width={30}
              height={30}
              className="object-cover w-6 h-6 mr-2"
            />
            Sign In with Google
          </Button> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
