import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PortfolioData, Professional } from '../types/index';

// Types
interface PortfolioState {
  portfolios: PortfolioData[];
  professionals: Professional[];
  currentPortfolio: PortfolioData | null;
  filters: {
    searchTerm: string;
    selectedRole: string;
    selectedLocation: string;
    sortBy: string;
  };
}

type PortfolioAction =
  | { type: 'ADD_PORTFOLIO'; payload: PortfolioData }
  | { type: 'UPDATE_PORTFOLIO'; payload: PortfolioData }
  | { type: 'DELETE_PORTFOLIO'; payload: string }
  | { type: 'SET_CURRENT_PORTFOLIO'; payload: PortfolioData }
  | { type: 'ADD_PROFESSIONAL'; payload: Professional }
  | { type: 'UPDATE_PROFESSIONAL'; payload: Professional }
  | { type: 'SET_FILTERS'; payload: Partial<PortfolioState['filters']> }
  | { type: 'FILTER_PROFESSIONALS'; payload: Professional[] };

// Reducer
const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case 'ADD_PORTFOLIO':
      return {
        ...state,
        portfolios: [...state.portfolios, action.payload]
      };
    case 'UPDATE_PORTFOLIO':
      return {
        ...state,
        portfolios: state.portfolios.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PORTFOLIO':
      return {
        ...state,
        portfolios: state.portfolios.filter(p => p.id !== action.payload)
      };
    case 'SET_CURRENT_PORTFOLIO':
      return {
        ...state,
        currentPortfolio: action.payload
      };
    case 'ADD_PROFESSIONAL':
      return {
        ...state,
        professionals: [...state.professionals, action.payload]
      };
    case 'UPDATE_PROFESSIONAL':
      return {
        ...state,
        professionals: state.professionals.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'FILTER_PROFESSIONALS':
      return {
        ...state,
        professionals: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState: PortfolioState = {
  portfolios: [],
  professionals: [
    {
      id: '1',
      name: 'John Doe',
      role: 'Frontend Developer',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      rating: 4.8,
      bio: 'Experienced frontend developer with expertise in React, TypeScript, and modern web technologies.',
      experience: 5,
      projects: 12,
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML']
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      location: 'San Francisco, USA',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      rating: 4.9,
      bio: 'Creative UI/UX designer passionate about creating beautiful and functional user experiences.',
      experience: 7,
      projects: 18,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Backend Developer',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      rating: 4.7,
      bio: 'Senior backend developer specializing in Node.js, Python, and cloud architecture.',
      experience: 8,
      projects: 25,
      skills: ['Node.js', 'Python', 'AWS', 'Docker', 'MongoDB']
    }
  ],
  currentPortfolio: null,
  filters: {
    searchTerm: '',
    selectedRole: '',
    selectedLocation: '',
    sortBy: 'name'
  }
};

// Context
interface PortfolioContextType {
  state: PortfolioState;
  addPortfolio: (portfolio: PortfolioData) => void;
  updatePortfolio: (portfolio: PortfolioData) => void;
  deletePortfolio: (id: string) => void;
  setCurrentPortfolio: (portfolio: PortfolioData) => void;
  addProfessional: (professional: Professional) => void;
  updateProfessional: (professional: Professional) => void;
  setFilters: (filters: Partial<PortfolioState['filters']>) => void;
  filterProfessionals: (professionals: Professional[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Provider
interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const addPortfolio = (portfolio: PortfolioData) => {
    dispatch({ type: 'ADD_PORTFOLIO', payload: portfolio });
  };

  const updatePortfolio = (portfolio: PortfolioData) => {
    dispatch({ type: 'UPDATE_PORTFOLIO', payload: portfolio });
  };

  const deletePortfolio = (id: string) => {
    dispatch({ type: 'DELETE_PORTFOLIO', payload: id });
  };

  const setCurrentPortfolio = (portfolio: PortfolioData) => {
    dispatch({ type: 'SET_CURRENT_PORTFOLIO', payload: portfolio });
  };

  const addProfessional = (professional: Professional) => {
    dispatch({ type: 'ADD_PROFESSIONAL', payload: professional });
  };

  const updateProfessional = (professional: Professional) => {
    dispatch({ type: 'UPDATE_PROFESSIONAL', payload: professional });
  };

  const setFilters = (filters: Partial<PortfolioState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const filterProfessionals = (professionals: Professional[]) => {
    dispatch({ type: 'FILTER_PROFESSIONALS', payload: professionals });
  };

  const value = {
    state,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    setCurrentPortfolio,
    addProfessional,
    updateProfessional,
    setFilters,
    filterProfessionals
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Hook
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
