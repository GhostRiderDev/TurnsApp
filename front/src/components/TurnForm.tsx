import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TurnForm = () => {
  return (
    <div className="flex flex-row my-auto bg-red-700 w-[78vw] mt-8">
      <Card className="w-full flex flex-col mt-4 mx-auto  md:w-8/12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Add Turn</CardTitle>
          <CardDescription>
            Enter turn information add schedule field
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center flex-col items-center">
          <label>Select your fields</label>
          <Carousel
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
          </Carousel>
          <label>
            
          </label>
        </CardContent>
      </Card>
    </div>
  );
};

export default TurnForm;
