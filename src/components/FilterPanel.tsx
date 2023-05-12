import React, { useState } from 'react';

interface FilterPanelProps {
  onApplyFilters: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
  const [license, setLicense] = useState('');
  const [stars, setStars] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  const handleSubmit = () => {
    onApplyFilters({ license, stars, lastUpdate });
  };

  const starsOptions = [
    'no_Stars',
    'less_than_5_Stars',
    'around_10_Stars',
    'around_25_Stars',
    'around_50_Stars',
    'around_100_Stars',
    'around_250_Stars',
    'around_500_Stars',
    'around_750_Stars',
    'around_1000_Stars',
    'around_1500_Stars',
    'over_2000_Stars',
  ];

  const modifiedOptions = [
    'Today',
    'Yesterday',
    'This_Week',
    'Week_Ago',
    'Two_Weeks_Ago',
    'Month_Ago',
    'Two_Months_Ago',
    'Four_Months_Ago',
    'Six_Months_Ago',
    'Ten_Months_Ago',
    'Year_Ago',
    'Over_A_Year_Ago',
    'Two_Years_Ago',
    'Over_Two_Years_Ago',
  ];

  const licenseOptions = [
    'MIT_License',
    'Academic_Free_License_v3_0',
    'Apache_License_2_0',
    'Artistic_License_2_0',
    'BSD_2_Clause_Simplified_License',
    'BSD_3_Clause_Clear_License',
    'BSD_4_Clause_Original_or_Old_License',
    'BSD_Zero_Clause_License',
    'Boost_Software_License_1_0',
    'CERN_Open_Hardware_Licence_Version_2_Permissive',
    'CERN_Open_Hardware_Licence_Version_2_Strongly_Reciprocal',
    'CERN_Open_Hardware_Licence_Version_2_Weakly_Reciprocal',
    'CeCILL_Free_Software_License_Agreement_v2_1',
    'Creative_Commons_Attribution_4_0_International',
    'Creative_Commons_Attribution_Share_Alike_4_0_International',
    'Creative_Commons_Zero_v1_0_Universal',
    'Do_What_The_Fuck_You_Want_To_Public_License',
    'Eclipse_Public_License_1_0',
    'Eclipse_Public_License_2_0',
    'Educational_Community_License_v2_0',
    'European_Union_Public_License_1_1',
    'European_Union_Public_License_1_2',
    'GNU_Affero_General_Public_License_v3_0',
    'GNU_Free_Documentation_License_v1_3',
    'GNU_General_Public_License_v2_0',
    'GNU_General_Public_License_v3_0',
    'GNU_Lesser_General_Public_License_v2_1',
    'GNU_Lesser_General_Public_License_v3_0',
    'ISC_License',
    'LaTeX_Project_Public_License_v1_3c',
   
    'MIT_No_Attribution',
    'Mozilla_Public_License_2_0',
    'Microsoft_Public_License',
    'Microsoft_Reciprocal_License',
    'Mulan_Permissive_Software_License_Version_2',
    'Open_Data_Commons_Open_Database_License_v1_0',
    'Open_Software_License_3_0',
    'PostgreSQL_License',
    'SIL_Open_Font_License_1_1',
    'The_Unlicense',
    'Universal_Permissive_License_v1_0',
    'University_of_Illinois__NCSA_Open_Source_License',
    'Vim_License',
    'zlib_License'
    
  ];

  return (
    <div className="filter-panel p-4">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <div className="flex flex-wrap justify-between gap-4">
        <label className="flex flex-col w-40">
          License:
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full bg-white text-black px-2 py-1"
          >
            <option value="">Select License</option>
            {licenseOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col w-40">
          Stars:
          <select
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            className="w-full bg-white text-black px-2 py-1"
          >
            <option value="">Select Stars</option>
            {starsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col w-40">
          Last Update:
          <select
            value={lastUpdate}
            onChange={(e) => setLastUpdate(e.target.value)}
            className="w-full bg-white text-black px-2 py-1"
          >
            <option value="">Select Date</option>
            {modifiedOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 mt-4 rounded text-sm self-start"
              onClick={handleSubmit}
          >
              Apply Filters
          </button>
      </div>
    </div>
  );
};

export default FilterPanel;

