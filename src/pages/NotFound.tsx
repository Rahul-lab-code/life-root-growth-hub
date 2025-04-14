
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md p-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-liferoot-earth-light flex items-center justify-center animate-float">
            <span className="text-4xl">🍃</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-liferoot-green">404</h1>
        <p className="text-xl text-foreground mb-4">Oops! This page seems to have wandered off the path</p>
        <p className="text-muted-foreground mb-6">
          The page you're looking for can't be found. Let's get you back on track.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          className="flex gap-2 items-center mx-auto"
        >
          <Home className="h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
