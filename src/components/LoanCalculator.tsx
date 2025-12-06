import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import InfoModal from '@/components/InfoModal';
import TildaCodeModal from '@/components/TildaCodeModal';

const LOAN_CONFIG = {
  minAmount: 5000,
  maxAmount: 100000,
  minDays: 5,
  maxDays: 30,
  baseRate: 0.02,
  discountRate: 0.01,
  receiveTimeOffset: 20,
} as const;

const formatAmount = (value: number): string => {
  return value.toLocaleString('ru-RU');
};

const calculateReturnDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const calculateReceiveTime = (): string => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + LOAN_CONFIG.receiveTimeOffset);
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);
  const [showCode, setShowCode] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [receiveTime, setReceiveTime] = useState(calculateReceiveTime());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowCode(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReceiveTime(calculateReceiveTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const returnDate = useMemo(() => calculateReturnDate(days), [days]);

  const loanCalculation = useMemo(() => {
    const normalInterest = Math.round(amount * LOAN_CONFIG.baseRate * days);
    const discountedInterest = Math.round(amount * LOAN_CONFIG.discountRate * days);
    return {
      normalTotal: amount + normalInterest,
      discountedTotal: amount + discountedInterest,
    };
  }, [amount, days]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 flex items-center justify-center p-0">
        <Card className="w-full bg-white shadow-2xl rounded-2xl sm:rounded-none overflow-hidden h-screen flex flex-col">
          <header className="bg-gradient-to-r from-primary via-blue-600 to-primary p-5 relative overflow-hidden">
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-4xl sm:text-6xl opacity-20">
              ✓💰🎁
            </div>
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                Первый заём бесплатно!
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-white/90 text-base sm:text-lg">
                  При условии возврата в срок
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <Icon name="Clock" size={16} className="text-white" />
                  <span className="text-white font-semibold text-sm sm:text-base">
                    Получите до {receiveTime}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="p-5 pb-3 space-y-5 flex-1 overflow-y-auto">
            <section className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-lg sm:text-xl text-gray-700">Сумма</label>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatAmount(amount)} ₽
                </span>
              </div>
              <div className="relative pt-2 pb-4">
                <Slider
                  value={[amount]}
                  onValueChange={(value) => setAmount(value[0])}
                  min={LOAN_CONFIG.minAmount}
                  max={LOAN_CONFIG.maxAmount}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{formatAmount(LOAN_CONFIG.minAmount)} ₽</span>
                  <span>{formatAmount(LOAN_CONFIG.maxAmount)} ₽</span>
                </div>
              </div>
            </section>

            <section className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-lg sm:text-xl text-gray-700">Срок</label>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {days} дней
                </span>
              </div>
              <div className="relative pt-2 pb-4">
                <Slider
                  value={[days]}
                  onValueChange={(value) => setDays(value[0])}
                  min={LOAN_CONFIG.minDays}
                  max={LOAN_CONFIG.maxDays}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{LOAN_CONFIG.minDays} дней</span>
                  <span>{LOAN_CONFIG.maxDays} дней</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3 sm:gap-6 pt-2 sm:pt-4">
              <div>
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Возвращаете</p>
                <div className="space-y-1">
                  <p className="text-gray-400 line-through text-sm sm:text-lg">
                    {formatAmount(loanCalculation.normalTotal)} ₽
                  </p>
                  <div className="inline-block bg-[#C4F54E] px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {formatAmount(loanCalculation.discountedTotal)} ₽
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Дата возврата</p>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 mt-1 sm:mt-3">
                  {returnDate}
                </p>
              </div>
            </section>

            <div className="pt-3">
              <Button 
                asChild
                className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="#popup:myform">
                  Получить займ
                </a>
              </Button>
            </div>

            <div className="text-center pt-3">
              <button 
                onClick={() => setShowInfoModal(true)}
                className="text-primary hover:underline text-sm sm:text-base transition-all duration-200"
              >
                Что если я не успею вернуть заём вовремя?
              </button>
            </div>

            <footer className="pt-2 border-t border-gray-200 mt-2">
              <p className="text-xs text-gray-500 text-center mb-2">Способы оплаты</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="bg-gradient-to-r from-[#0A9A4A] to-[#06823D] rounded-lg px-4 py-2 flex items-center gap-2 shadow-md">
                  <Icon name="Landmark" size={20} className="text-white" />
                  <span className="text-sm font-bold text-white">МИР</span>
                </div>
                <div className="bg-gradient-to-r from-[#5B57A2] to-[#4A4687] rounded-lg px-4 py-2 flex items-center gap-2 shadow-md">
                  <Icon name="Smartphone" size={20} className="text-white" />
                  <span className="text-sm font-bold text-white">СБП</span>
                </div>
              </div>
            </footer>
          </main>
        </Card>
      </div>

      {showCode && <TildaCodeModal onClose={() => setShowCode(false)} />}
      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </>
  );
}