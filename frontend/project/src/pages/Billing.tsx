import React, { useState } from 'react';
import { CreditCard, Download, Plus, ChevronDown } from 'lucide-react';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  credits: number;
  status: 'completed' | 'pending' | 'failed';
}

const Billing: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  
  // Mock data - in a real app this would come from an API
  const creditPackages = [
    { credits: 50, price: 25 },
    { credits: 150, price: 60, label: 'Best Value' },
    { credits: 500, price: 150 }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date('2024-03-10'),
      description: 'Credit Purchase - 150 Credits',
      amount: 60,
      credits: 150,
      status: 'completed'
    },
    {
      id: '2',
      date: new Date('2024-03-05'),
      description: 'Project Generation - Spring Coffee Launch',
      amount: 0,
      credits: -5,
      status: 'completed'
    }
  ];

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400';
      case 'pending':
        return 'text-amber-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C2E] text-slate-200 p-4 md:p-8"> {/* Added default text color and responsive padding */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Billing & Credits</h1> {/* Responsive title size */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credits Card & Purchase Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Credits Card */}
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <CreditCard className="h-8 w-8 text-white mr-3" />
                <span className="text-lg font-medium text-white/80">Credits Balance</span>
              </div>
              <div className="text-4xl font-bold text-white mb-4">145 Credits</div>
              <div className="text-sm text-white/80">Member since March 2024</div>
            </div>
          </div>

          {/* Purchase Credits */}
          <div className="bg-[#242842] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Purchase Credits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {creditPackages.map((pkg, index) => (
                <button
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-center ${ /* Added responsive padding and text-center */
                    selectedPackage === index
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-slate-700 hover:border-violet-500/50'
                  }`}
                  onClick={() => setSelectedPackage(index)}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1"> {/* Further responsive font size */}
                    {pkg.credits} Credits
                  </div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg text-[#7FFFD4]">${pkg.price}</div> {/* Further responsive font size */}
                  {pkg.label && (
                    <div className="text-xs text-violet-400 mt-2">{pkg.label}</div>
                  )}
                </button>
              ))}
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Purchase Credits
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#242842] rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold text-white mb-6">Payment Methods</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#2C3254] rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-slate-400 mr-3" />
                <div>
                  <div className="text-white">•••• 1234</div>
                  <div className="text-sm text-slate-400">Expires 12/25</div>
                </div>
              </div>
              <button className="text-sm text-violet-400 hover:text-violet-300">Edit</button>
            </div>
            <button className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-violet-500/50 transition-all">
              <Plus className="h-5 w-5 mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Transaction History</h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center text-slate-400 hover:text-white transition-colors">
              Last 30 days
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        {/* Wrap table in a div for horizontal scrolling on small screens */}
        <div className="bg-[#242842] rounded-xl overflow-x-auto">
          <table className="w-full min-w-[600px] md:min-w-full">{/* Ensure table has a min-width to force scroll, or remove md:min-w-full if w-full is enough */}<thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Description</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Amount</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Credits</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-400">Status</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-400">Receipt</th>
              </tr>
            </thead><tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-slate-700/50 last:border-0">
                  <td className="py-4 px-6 text-slate-300">
                    {transaction.date.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-slate-300">{transaction.description}</td>
                  <td className="py-4 px-6 text-right text-slate-300">
                    {transaction.amount > 0 ? `$${transaction.amount}` : '-'}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-300">
                    {transaction.credits > 0 ? `+${transaction.credits}` : transaction.credits}
                  </td>
                  <td className="py-4 px-6">
                    <span className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {transaction.amount > 0 && (
                      <button className="text-slate-400 hover:text-white transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody></table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
