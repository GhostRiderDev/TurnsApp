import { Card, CardContent } from "./ui/card";

function Fields() {
  return (
    <div className="w-[78vw]  gap-6 my-auto flex h-screen items-center mx-auto">
      <Card className="h-1/2 flex items-center">
        <CardContent className="flex flex-col justify-center">
          <img src="https://as1.ftcdn.net/v2/jpg/05/97/62/48/1000_F_597624843_D3U1nc0C4x8ubs5CdhJGj2xcZ07qfRyU.jpg" />
        </CardContent>
      </Card>
      <Card className="h-1/2 flex items-center">
        <CardContent className="flex flex-col justify-center">
          <img src="https://as1.ftcdn.net/v2/jpg/05/97/62/48/1000_F_597624843_D3U1nc0C4x8ubs5CdhJGj2xcZ07qfRyU.jpg" />
        </CardContent>
      </Card>
      <Card className="h-1/2 flex items-center">
        <CardContent className="flex flex-col justify-center">
          <img src="https://as1.ftcdn.net/v2/jpg/05/97/62/48/1000_F_597624843_D3U1nc0C4x8ubs5CdhJGj2xcZ07qfRyU.jpg" />
        </CardContent>
      </Card>
    </div>
  );
}

export default Fields;
