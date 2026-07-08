import { useEffect, useRef } from "react";
import {
  KeyRoundIcon,
  Loader2Icon,
  ShieldCheckIcon,
  XIcon,
} from "lucide-react";

interface OtpModalProps {
  setOtpModal: (otpModal: string | null) => void;
  otp: string;
  setOtp: (otp: string) => void;
  handleComplete: () => void;
  submitting: boolean;
}

export default function OtpModal({
  setOtpModal,
  otp,
  setOtp,
  handleComplete,
  submitting,
}: OtpModalProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleClose = () => {
    setOtpModal(null);
    setOtp("");
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const digits = otp.padEnd(6, "").split("");

  const handleChange = (index: number, value: string) => {
    value = value.replace(/\D/g, "");

    if (!value) {
      const arr = otp.padEnd(6, "").split("");
      arr[index] = "";
      setOtp(arr.join("").trim());
      return;
    }

    const arr = otp.padEnd(6, "").split("");
    arr[index] = value[0];
    setOtp(arr.join("").trim());

    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const arr = otp.padEnd(6, "").split("");
        arr[index] = "";
        setOtp(arr.join("").trim());
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(pasted);

    const nextIndex = Math.min(pasted.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-app-border">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-app-green flex items-center justify-center">
                <KeyRoundIcon size={14} className="text-white" />
              </div>

              <div>
                <h3 className="text-[15px] font-semibold">
                  Enter Delivery OTP
                </h3>

                <p className="text-[12px] text-app-text-light">
                  Ask the customer for the 6-digit OTP
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="size-8 rounded-lg hover:bg-app-cream flex items-center justify-center"
            >
              <XIcon size={16} />
            </button>
          </div>

          <div className="p-5 space-y-6">

            <div>
              <p className="text-center text-[11px] font-bold uppercase tracking-widest text-app-text-light mb-4">
                6-Digit OTP
              </p>

              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digits[index] || ""}
                    onChange={(e) =>
                      handleChange(index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-app-cream-darker rounded-xl focus:border-app-green outline-none transition"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-app-cream border border-app-border">
              <ShieldCheckIcon
                className="size-4 text-app-green-accent shrink-0"
              />

              <p className="text-[12px] text-app-text-muted">
                Only confirm delivery after the customer shows you the OTP.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-app-border bg-app-cream hover:bg-app-cream-dark font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleComplete}
                disabled={otp.length !== 6 || submitting}
                className="flex-1 py-3 rounded-xl bg-app-green text-white hover:bg-app-green-lighter disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Confirm Delivery"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}