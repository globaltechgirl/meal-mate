import { Box } from "@mantine/core";
import Slider from "@/component/auth/slider";  
import LoginForm from "@/component/auth/login"; 

const Login: React.FC = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--dark-400)",
        display: "flex",              
        alignItems: "center",          
        justifyContent: "center",      
      }}
    >
      <Box
        style={{
          width: "70%",
          height: "90vh",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          background: "var(--light-200)",
          borderRadius: "8px",
          padding: "5px",
          gap: "10px",
        }}
      >
        <Box
          style={{
            flex: 1,
            display: "flex",
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
