import Lottie from "lottie-react";

export const LottieAnimator = ({
  json,
  loop = true,
}: {
  json: unknown;
  loop?: boolean;
}) => {
  return (
    <Lottie
      animationData={json}
      loop={loop}
      className="w-full h-full max-w-full max-h-full"
    />
  );
};

export default LottieAnimator;
