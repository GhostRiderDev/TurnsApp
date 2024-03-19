import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import z from "zod";
import turnSchema from "@/zod/turnSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import { IUser } from "@/interface/user";
import ITurn from "@/interfaces/ITurn";
import { useDispatch } from "react-redux";
import { addTurnClient } from "@/reducer/turnsReducer";
import { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router";

const TurnForm = () => {
  const user = useSelector((state: { user: IUser }) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof turnSchema>>({
    resolver: zodResolver(turnSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      startTime: "11:00",
      finishTime: "11:30",
    },
  });

  const handleAddTurn = (values: z.infer<typeof turnSchema>) => {
    const { date, startTime, finishTime } = values;
    const [hourStart, minStart] = startTime.split(":");
    const [hourFinish, minFinish] = finishTime.split(":");

    const totalMinStart = parseInt(hourStart) * 60 + parseInt(minStart);
    const totalMinFinish = parseInt(hourFinish) * 60 + parseInt(minFinish);
    if (totalMinFinish <= totalMinStart) {
      form.setError("finishTime", { message: "Invalid finish time" });

      // Clear the error message after 5 seconds
      setTimeout(() => {
        form.clearErrors("finishTime");
      }, 3000);
      return;
    }

    const turnToSend: ITurn = {
      id_client: user.id_user,
      date,
      start_time: totalMinStart,
      finish_time: totalMinFinish,
      id_fields: ["2da46c9f-3a96-4dcf-a428-8bd5e7422d01"],
    };

    dispatch(addTurnClient(turnToSend));
    navigate("/user/turns");
  };
  return (
    <div className="flex flex-row my-auto w-[78vw] mt-8 h-screen items-center">
      <Card className="w-full h-4/6 flex flex-col mt-4 mx-auto  md:w-8/12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Add Turn</CardTitle>
          <CardDescription>
            Enter turn information add schedule field
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[50vh]">
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleAddTurn(form.getValues());
              }}
              className="flex"
            >
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-max max-w-s "
              >
                <CarouselContent>
                  <CarouselItem className="md:basis-1/1 lg:basis-1/1 flex  justify-between w-min items-center gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="w-1/2 fle flex-col justify-between  h-1/2 items-center">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input
                              min={new Date().toISOString().split("T")[0]}
                              max={
                                new Date(
                                  new Date().setMonth(new Date().getMonth() + 2)
                                )
                                  .toISOString()
                                  .split("T")[0]
                              }
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Date for you reservation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <img src="/src/assets/ticket.jpg" className="w-72" />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/1 lg:basis-1/1 flex  justify-between w-min items-center gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="w-1/2 fle flex-col justify-between  h-1/2 items-center">
                          <FormLabel>Start time:</FormLabel>
                          <FormControl>
                            <select {...field}>
                              {(() => {
                                const times = [];
                                for (let i = 22; i < 47; i++) {
                                  const hour = Math.floor(i / 2);
                                  const minute = i % 2 === 0 ? "00" : "30";
                                  const value = `${hour
                                    .toString()
                                    .padStart(2, "0")}:${minute}`;
                                  times.push(
                                    <option key={value} value={value}>
                                      {value}
                                    </option>
                                  );
                                }
                                return times;
                              })()}
                            </select>
                          </FormControl>
                          <FormDescription>
                            This is hour of you want start match
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <img src="/src/assets/ticket.jpg" className="w-72" />
                  </CarouselItem>
                  <CarouselItem className="flex flex-col justify-around">
                    <FormField
                      control={form.control}
                      name="finishTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Finish time:</FormLabel>
                          <FormControl>
                            <FormControl>
                              <select {...field}>
                                {(() => {
                                  const times = [];
                                  for (let i = 22; i < 47; i++) {
                                    const hour = Math.floor(i / 2);
                                    const minute = i % 2 === 0 ? "00" : "30";
                                    const value = `${hour
                                      .toString()
                                      .padStart(2, "0")}:${minute}`;
                                    times.push(
                                      <option key={value} value={value}>
                                        {value}
                                      </option>
                                    );
                                  }
                                  return times;
                                })()}
                              </select>
                            </FormControl>
                          </FormControl>
                          <FormDescription>
                            This is hour of you want finish match
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full my-4 bg-green-800 hover:bg-greenLight hover:text-black"
                    >
                      Add
                    </Button>
                  </CarouselItem>
                  <CarouselContent></CarouselContent>
                </CarouselContent>
                <CarouselPrevious
                  type="button"
                  className="w-[50px] h-[50px] ml-[-40%] rounded-full"
                />

                <CarouselNext
                  type="button"
                  className="w-[50px] h-[50px] mr-[-40%] rounded-full"
                />
              </Carousel>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TurnForm;

{
  /* <Carousel
            opts={{
              align: "start",
            }}
            className="w-max max-w-sm "
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <label key={index} className="checkbox-container">
                    <input type="checkbox" />
                    <img
                      src="https://canchasintetica.com/wp-content/uploads/2023/01/cancha-sintetica-de-futbol-scaled.jpg"
                      className="rounded-md"
                    />
                  </label>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>  */
}
