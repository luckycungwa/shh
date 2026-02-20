import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

interface PaymentDate {
  grant: string;
  date: string;
  day: string;
}

const PaymentCountdown: React.FC = () => {
  const [nextPayment, setNextPayment] = useState<PaymentDate | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/paymentDates.json");
        if (!response.ok) throw new Error("Failed to fetch payment dates");
        const data: PaymentDate[] = await response.json();

        const now = new Date();
        const futureDates = data
          .map(p => ({ ...p, time: new Date(p.date).getTime() }))
          .filter(p => p.time > now.getTime())
          .sort((a, b) => a.time - b.time);

        if (futureDates.length > 0) {
          setNextPayment(futureDates[0]);
        }
      } catch (err) {
        console.error("Countdown error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!nextPayment) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(nextPayment.date).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPayment]);

  if (!nextPayment || !timeLeft) return null;

  return (
    <div className="bg-primary-black text-white p-6 rounded-2xl shadow-2xl border-2 border-primary-gold animate-fade-in">
      <div className="flex items-center gap-2 mb-4 text-primary-gold">
        <Calendar className="w-5 h-5" />
        <span className="text-sm font-bold uppercase tracking-widest">Next Grant Payment</span>
      </div>

      <h3 className="text-xl font-bold mb-4">{nextPayment.grant}</h3>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="text-2xl md:text-3xl font-bold text-primary-gold">{timeLeft.days}</div>
          <div className="text-[10px] uppercase opacity-60">Days</div>
        </div>
        <div className="bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="text-2xl md:text-3xl font-bold text-primary-gold">{timeLeft.hours}</div>
          <div className="text-[10px] uppercase opacity-60">Hours</div>
        </div>
        <div className="bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="text-2xl md:text-3xl font-bold text-primary-gold">{timeLeft.minutes}</div>
          <div className="text-[10px] uppercase opacity-60">Mins</div>
        </div>
        <div className="bg-white bg-opacity-10 p-3 rounded-lg">
          <div className="text-2xl md:text-3xl font-bold text-primary-gold">{timeLeft.seconds}</div>
          <div className="text-[10px] uppercase opacity-60">Secs</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <Clock className="w-3 h-3" />
        <span>Payment expected on: {new Date(nextPayment.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default PaymentCountdown;
