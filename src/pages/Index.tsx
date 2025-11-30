import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(10);
  const [returnDate, setReturnDate] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [receiveTime, setReceiveTime] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowCode(true);
    }
  }, []);

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

  useEffect(() => {
    const updateReceiveTime = () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 20);
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setReceiveTime(`${hours}:${minutes}`);
    };
    updateReceiveTime();
    const interval = setInterval(updateReceiveTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatAmount = (value: number) => {
    return value.toLocaleString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 flex items-center justify-center p-0 sm:p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden h-screen sm:h-auto sm:my-4">
        <div className="bg-gradient-to-r from-primary via-blue-600 to-primary p-5 sm:p-6 relative overflow-hidden">
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
        </div>

        <div className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-8">
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

          <div className="pt-3 sm:pt-4">
            <Button 
              asChild
              className="w-full h-14 sm:h-16 text-lg sm:text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="https://www.money-financei.ru/theapplicationisoffline" target="_blank" rel="noopener noreferrer">
                Получить займ
              </a>
            </Button>
          </div>

          <div className="text-center pt-2 sm:pt-2 pb-1">
            <button 
              onClick={() => setShowInfoModal(true)}
              className="text-primary hover:underline text-sm sm:text-base transition-all duration-200"
            >
              Что если я не успею вернуть заём вовремя?
            </button>
          </div>
        </div>
      </Card>

      {showCode && (
        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-2xl shadow-2xl max-w-md border-2 border-primary/20 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-gray-900">Код для Tilda</h3>
            <button 
              onClick={() => setShowCode(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
            <code>
              &lt;iframe src="{window.location.origin}" 
              <br />width="100%" height="800px" 
              <br />frameborder="0"&gt;&lt;/iframe&gt;
            </code>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`<iframe src="${window.location.origin}" width="100%" height="800px" frameborder="0"></iframe>`);
            }}
            className="w-full mt-3 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Скопировать код
          </button>
          <p className="text-xs text-gray-600 mt-3">
            Вставьте этот код в блок T123 (HTML) на Tilda
          </p>
        </div>
      )}

      {showInfoModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowInfoModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl z-50 p-6 sm:p-8 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} className="text-red-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Просрочка платежа</h3>
              </div>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-base leading-relaxed">
                При несвоевременном возврате займа начисляются дополнительные проценты и штрафы согласно договору.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <Icon name="Info" size={18} />
                  Важно знать:
                </h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Пени начисляются с первого дня просрочки</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Штраф составляет 0,1% от суммы займа за каждый день просрочки</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Информация может быть передана в бюро кредитных историй</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  Не можете погасить вовремя?
                </h4>
                <p className="text-sm text-blue-800">
                  Свяжитесь с нашей службой поддержки до даты платежа. Мы поможем найти решение и предложим план реструктуризации долга.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowInfoModal(false)}
              className="w-full mt-6 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl"
            >
              Понятно
            </Button>
          </div>
        </>
      )}
    </div>
  );
}