import Icon from '@/components/ui/icon';

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">
            Что если я не успею вернуть заём вовремя?
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            aria-label="Закрыть"
          >
            <Icon name="X" size={24} />
          </button>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <Icon name="AlertCircle" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Пролонгация займа
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Если вы понимаете, что не успеете вернуть деньги в срок, вы можете продлить займ. 
                  Для этого свяжитесь с нашей службой поддержки за 1-2 дня до окончания срока.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-yellow-100 rounded-full p-2 flex-shrink-0">
                <Icon name="TrendingUp" size={24} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Начисление процентов
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  При просрочке будут начисляться дополнительные проценты согласно договору. 
                  Чем быстрее вы вернёте займ, тем меньше переплата.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                <Icon name="Phone" size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Свяжитесь с нами
                </h3>
                <p className="text-sm sm:text-base leading-relaxed mb-3">
                  Мы всегда готовы найти индивидуальное решение. Не игнорируйте просрочку — 
                  позвоните нам, и мы поможем составить удобный график погашения.
                </p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Служба поддержки:</p>
                  <a 
                    href="tel:88001234567" 
                    className="text-primary font-semibold text-lg hover:underline inline-flex items-center gap-2"
                  >
                    <Icon name="Phone" size={18} />
                    8 (800) 123-45-67
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
