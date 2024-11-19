import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DevDeals } from './components/dev-deals';
import { DealDetails } from './components/deal-details';
import { AddDeal } from './components/admin/add-deal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevDeals category="all" />} />
        <Route path="/featured" element={<DevDeals category="featured" />} />
        <Route path="/new" element={<DevDeals category="new" />} />
        <Route path="/ai-tools" element={<DevDeals category="ai" />} />
        <Route path="/black-friday" element={<DevDeals category="blackfriday" />} />
        <Route path="/ending-soon" element={<DevDeals category="ending" />} />
        <Route path="/saas" element={<DevDeals category="saas" />} />
        <Route path="/developer-tools" element={<DevDeals category="dev" />} />
        <Route path="/design" element={<DevDeals category="design" />} />
        <Route path="/hosting" element={<DevDeals category="hosting" />} />
        <Route path="/marketing" element={<DevDeals category="marketing" />} />
        <Route path="/productivity" element={<DevDeals category="productivity" />} />
        <Route path="/business" element={<DevDeals category="business" />} />
        <Route path="/learning" element={<DevDeals category="education" />} />
        <Route path="/boilerplates" element={<DevDeals category="boilerplate" />} />
        <Route path="/no-code" element={<DevDeals category="nocode" />} />
        <Route path="/database" element={<DevDeals category="database" />} />
        <Route path="/analytics" element={<DevDeals category="analytics" />} />
        <Route path="/admin/add-deal" element={<AddDeal />} />
        <Route path="/:dealSlug" element={<DealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;