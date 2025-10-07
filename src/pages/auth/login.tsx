import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Slider from "@/component/auth/slider";  
import LoginForm from "@/component/auth/login"; 

const Login: React.FC = () => {
  const isSmall = useMediaQuery("(max-width: 768px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--dark-10)",
        display: "flex",              
        alignItems: "center",          
        justifyContent: "center",      
      }}
    >
      <Box
        style={{
          width: isSmall ? "98%" : isMedium ? "95%" : "70%", 
          height: isSmall ? "98vh" : isMedium ? "95%" : "90vh", 
          display: "flex",
          flexDirection: "row", 
          position: "relative",
          background: "var(--dark-20)",
          borderRadius: "8px",
          padding: "5px",
          gap: "10px",
        }}
      >
        <Box
          style={{
            flex: 1,
            display: isSmall ? "none" : isMedium ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--dark-500)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Slider />
        </Box>
      
        <Box
          style={{
            flex: 1,
            display: "flex",
            background: "var(--light-200)",
            borderRadius: "8px",
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
