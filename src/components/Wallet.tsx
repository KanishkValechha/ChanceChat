import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface WalletData {
  address: string;
}

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  onClick,
  style,
}) => {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 
                 hover:to-purple-600 text-white px-8 py-6 rounded-xl text-lg ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

const WalletAuth: React.FC = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const navigate = useNavigate();

  const getMartianWallet = () => {
    if (typeof window !== "undefined" && (window as any).martian) {
      return (window as any).martian;
    }
    return null;
  };

  const handleAuth = async () => {
    const martian = getMartianWallet();

    if (!martian) {
      alert("Martian Wallet is not installed. Redirecting to the website...");
      window.open("https://www.martianwallet.xyz/", "_blank");
      return;
    }

    try {
      const response = await martian.connect();
      console.log("Wallet Connection Response:", response);

      if (response.status === 200 && response.address) {
        const walletAddress = response.address; // Extract wallet address
        setWallet({ address: walletAddress });
        localStorage.setItem("walletAddress", walletAddress);

        // Redirect to /social after login
        navigate("/social");
      } else {
        console.error(
          "Failed to retrieve wallet address from response:",
          response
        );
      }
    } catch (error) {
      console.error("Error during wallet connection:", error);
      alert("Failed to connect to Martian Wallet. Please try again.");
    }
  };

  return (
    <CustomButton
      onClick={handleAuth}
      className="px-4 py-2 rounded"
      style={wallet ? { backgroundColor: "green" } : {}}
    >
      {wallet ? "Connected" : "Login"}
    </CustomButton>
  );
};

export default WalletAuth;
