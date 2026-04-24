import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, HelpCircle, Database, Beaker, BarChart3, CheckCircle, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-400 font-semibold">{children}</span>
);

const GoogleSheetEmbed = ({ url }: { url: string }) => (
  <div className="w-full rounded-xl overflow-hidden border border-slate-600">
    <iframe
      src={url}
      className="w-full h-96"
      title="Google Sheet Embed"
    />
  </div>
);

const ImageEmbed = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <div className="w-full">
    <img src={src} alt={alt} className="w-full rounded-xl border border-slate-600" />
    {caption && <p className="text-sm text-slate-400 mt-2 text-center italic">{caption}</p>}
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'research', label: 'Research Questions', icon: HelpCircle },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'methods', label: 'Methods', icon: Beaker },
    { id: 'eda', label: 'EDA', icon: BarChart3 },
    { id: 'conclusion', label: 'Conclusion', icon: CheckCircle },
    { id: 'team', label: 'Team', icon: Users },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-semibold text-white">Research Dashboard</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-cyan-500 text-slate-900'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 transition-all ${
                      activeSection === section.id
                        ? 'bg-cyan-500 text-slate-900'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(100, 116, 139, 0.3) 2px, rgba(100, 116, 139, 0.3) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(100, 116, 139, 0.3) 2px, rgba(100, 116, 139, 0.3) 4px)`
          }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 pb-4 bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent leading-tight">
            Research Project Dashboard
          </h1>
          <p className="text-base text-cyan-400 max-w-2xl mx-auto">
            Exploring data-driven insights through comprehensive analysis and visualization
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Overview Section */}
        <section id="overview" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Overview</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <p className="text-slate-200 leading-relaxed mb-4">
              This research project investigates <Highlight>key patterns and trends</Highlight> within our dataset through systematic analysis and exploratory data techniques. Our approach combines rigorous methodology with modern analytical tools to uncover meaningful insights.
            </p>
            <p className="text-slate-200 leading-relaxed">
              The findings presented here contribute to a deeper understanding of the underlying phenomena and provide <Highlight>actionable recommendations</Highlight> for stakeholders.
            </p>
          </div>
        </section>

        {/* Research Questions Section */}
        <section id="research" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Research Questions</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <ul className="space-y-4">
              {[
                'What are the primary factors influencing the observed outcomes?',
                'How do different variables correlate with each other?',
                'What patterns emerge from temporal analysis of the data?',
                'Can we identify significant trends or anomalies within the dataset?',
              ].map((question, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-semibold text-cyan-400 flex-shrink-0">{index + 1}.</span>
                  <span className="text-slate-200">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Dataset Section */}
        <section id="dataset" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Dataset</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">Total Records</div>
                <div className="text-2xl font-bold text-cyan-400">10,000+</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">Features</div>
                <div className="text-2xl font-bold text-cyan-400">25</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">Time Period</div>
                <div className="text-2xl font-bold text-cyan-400">2020-2026</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-sm text-slate-400 mb-1">Data Source</div>
                <div className="text-2xl font-bold text-cyan-400">Public API</div>
              </div>
            </div>
            <p className="text-slate-200 leading-relaxed mb-6">
              Our dataset comprises comprehensive records collected over multiple years, ensuring <Highlight>robust statistical analysis</Highlight>. Data preprocessing included handling missing values, outlier detection, and normalization to maintain data quality and reliability.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Sample Data</h3>
            {/* <GoogleSheetEmbed url="https://docs.google.com/spreadsheets/d/e/2PACX-1vQexample/pubhtml?widget=true&headers=false" /> */}
          </div>
        </section>

        {/* Methods Section */}
        <section id="methods" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Beaker className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Methods</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Data Collection</h3>
                <p className="text-slate-200">
                  Data was systematically gathered using <Highlight>automated scripts</Highlight> and validated against multiple sources to ensure accuracy and completeness.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Analysis Techniques</h3>
                <p className="text-slate-200">
                  We employed statistical methods including <Highlight>regression analysis</Highlight>, hypothesis testing, and machine learning algorithms to extract meaningful patterns from the data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Visualization Tools</h3>
                <p className="text-slate-200">
                  Interactive charts and graphs were created using modern visualization libraries to communicate findings effectively and enable deeper exploration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EDA Section */}
        <section id="eda" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Exploratory Data Analysis</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <p className="text-slate-200 leading-relaxed mb-6">
              Our exploratory analysis revealed several <Highlight>key insights</Highlight>:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Strong positive correlation between primary variables',
                'Seasonal patterns evident in temporal data',
                'Significant outliers identified and investigated',
                'Distribution patterns align with theoretical expectations',
                'Clear segmentation across categorical features',
                'No major data quality issues detected',
              ].map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{insight}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Sample Distribution</h3>
            <div className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Jan', value: 400 },
                  { name: 'Feb', value: 300 },
                  { name: 'Mar', value: 600 },
                  { name: 'Apr', value: 800 },
                  { name: 'May', value: 500 },
                  { name: 'Jun', value: 700 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#e2e8f0' }} />
                  <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                  <Bar dataKey="value" fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Trend Analysis</h3>
            <div className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { month: 'Jan', metric1: 65, metric2: 28 },
                  { month: 'Feb', metric1: 59, metric2: 48 },
                  { month: 'Mar', metric1: 80, metric2: 40 },
                  { month: 'Apr', metric1: 81, metric2: 56 },
                  { month: 'May', metric1: 56, metric2: 65 },
                  { month: 'Jun', metric1: 72, metric2: 73 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="month" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#e2e8f0' }} />
                  <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                  <Line type="monotone" dataKey="metric1" stroke="#22d3ee" strokeWidth={2} />
                  <Line type="monotone" dataKey="metric2" stroke="#a78bfa" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Supporting Visuals</h3>
            {/* <ImageEmbed
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
              alt="Data visualization example"
              caption="Example data visualization showing key metrics"
            /> */}
          </div>
        </section>

        {/* Conclusion Section */}
        <section id="conclusion" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Conclusion</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700">
            <p className="text-slate-200 leading-relaxed mb-4">
              This research successfully addressed our initial questions and provided <Highlight>valuable insights</Highlight> into the underlying patterns within the data. The methodology proved robust and the findings are <Highlight>statistically significant</Highlight>.
            </p>
            <p className="text-slate-200 leading-relaxed mb-4">
              Key takeaways include the identification of critical factors influencing outcomes, validation of initial hypotheses, and discovery of unexpected correlations that warrant further investigation.
            </p>
            <p className="text-slate-200 leading-relaxed">
              Future work will focus on expanding the dataset, refining our models, and exploring additional variables that may enhance predictive accuracy.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-cyan-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Jane Smith', role: 'Principal Investigator' },
              { name: 'John Doe', role: 'Data Scientist' },
              { name: 'Emily Chen', role: 'Research Analyst' },
              { name: 'Michael Park', role: 'Statistical Consultant' },
              { name: 'Sarah Johnson', role: 'Visualization Specialist' },
              { name: 'David Lee', role: 'Project Coordinator' },
            ].map((member, index) => (
              <div key={index} className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-400">
            © 2026 Research Project Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
