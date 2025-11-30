import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);
  const [returnDate, setReturnDate] = useState('');

  const minAmount = 5000;
  const maxAmount = 100000;
  const minDays = 5;
  const maxDays = 30;

  const baseRate = 0.02;
  const discountRate = 0.01;
  
  const normalInterest = Math.round(amount * baseRate * days);
  const discountedInterest = Math.round(amount * discountRate * days);
  const normalTotal = amount + normalInterest;
  const discountedTotal = amount + discountedInterest;

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setReturnDate(today.toLocaleDateString('ru-RU', options));
  }, [days]);

  const formatAmount = (value: number) => {
    return value.toLocaleString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-4xl sm:text-6xl opacity-20">
            ✓💰🎁
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Первый заём бесплатно!
            </h1>
            <p className="text-white/90 text-base sm:text-lg">
              При условии возврата в срок
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
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
                min={minAmount}
                max={maxAmount}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatAmount(minAmount)} ₽</span>
                <span>{formatAmount(maxAmount)} ₽</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
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
                min={minDays}
                max={maxDays}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{minDays} дней</span>
                <span>{maxDays} дней</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 pt-2 sm:pt-4">
            <div>
              <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Возвращаете</p>
              <div className="space-y-1">
                <p className="text-gray-400 line-through text-sm sm:text-lg">
                  {formatAmount(normalTotal)} ₽
                </p>
                <div className="inline-block bg-[#C4F54E] px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {formatAmount(discountedTotal)} ₽
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
          </div>

          <div className="pt-2 sm:pt-4">
            <Button 
              className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Получить займ
            </Button>
          </div>

          <div className="text-center pt-1 sm:pt-2 space-y-3">
            <button className="text-primary hover:underline text-sm sm:text-base transition-all duration-200 block w-full">
              Что если я не успею вернуть заём вовремя?
            </button>
            
            <div className="bg-blue-50 border border-primary/20 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Код для Tilda:</p>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <code className="text-xs text-gray-800 break-all">
                  &lt;iframe src="{window.location.href}" width="100%" height="800px" frameborder="0"&gt;&lt;/iframe&gt;
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Вставьте этот код в блок T123 (HTML) на Tilda
              </p>
            </div>
          </div>
        </div>
      </Card>


    </div>
  );
}