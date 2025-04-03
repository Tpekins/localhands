import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { jobs } from '../components/data/jobs';
import { profiles } from '../components/data/profiles';
import { proposals } from '../components/data/proposals';
import { contracts } from '../components/data/contracts';
import { payments } from '../components/data/payments';
import { reviews } from '../components/data/reviews';

// Types
type Job = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  numberOfSlots: number;
  acceptedSlots: number;
  status: string;
  createdAt: Date;
};

type Profile = {
  id: string;
  userId: string;
  mobileMoneyNumber?: string;
  nationalIdUrl?: string;
  verificationStatus: string;
  location: string;
};

type Proposal = {
  id: string;
  freelancerId: string;
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  status: string;
  createdAt: Date;
};

type Contract = {
  id: string;
  proposalId: string;
  escrowAmount: number;
  status: string;
  createdAt: Date;
};

type Payment = {
  id: string;
  contractId: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt: Date;
};

type Review = {
  id: string;
  contractId: string;
  reviewerId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
};

interface State {
  jobs: Job[];
  profiles: Profile[];
  proposals: Proposal[];
  contracts: Contract[];
  payments: Payment[];
  reviews: Review[];
}

type Action =
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'ADD_PROPOSAL'; payload: Proposal }
  | { type: 'UPDATE_PROPOSAL'; payload: Proposal }
  | { type: 'ADD_CONTRACT'; payload: Contract }
  | { type: 'UPDATE_CONTRACT'; payload: Contract }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'UPDATE_PAYMENT'; payload: Payment }
  | { type: 'ADD_REVIEW'; payload: Review };

const initialState: State = {
  jobs,
  profiles,
  proposals,
  contracts,
  payments,
  reviews,
};

function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
      };
    case 'ADD_PROPOSAL':
      return { ...state, proposals: [...state.proposals, action.payload] };
    case 'UPDATE_PROPOSAL':
      return {
        ...state,
        proposals: state.proposals.map(proposal =>
          proposal.id === action.payload.id ? action.payload : proposal
        ),
      };
    case 'ADD_CONTRACT':
      return { ...state, contracts: [...state.contracts, action.payload] };
    case 'UPDATE_CONTRACT':
      return {
        ...state,
        contracts: state.contracts.map(contract =>
          contract.id === action.payload.id ? action.payload : contract
        ),
      };
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map(payment =>
          payment.id === action.payload.id ? action.payload : payment
        ),
      };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    default:
      return state;
  }
}

const DataContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hooks for accessing data
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function useJobs() {
  const { state, dispatch } = useData();
  return {
    jobs: state.jobs,
    addJob: (job: Job) => dispatch({ type: 'ADD_JOB', payload: job }),
    updateJob: (job: Job) => dispatch({ type: 'UPDATE_JOB', payload: job }),
    deleteJob: (id: string) => dispatch({ type: 'DELETE_JOB', payload: id }),
  };
}

export function useProposals() {
  const { state, dispatch } = useData();
  return {
    proposals: state.proposals,
    addProposal: (proposal: Proposal) => 
      dispatch({ type: 'ADD_PROPOSAL', payload: proposal }),
    updateProposal: (proposal: Proposal) =>
      dispatch({ type: 'UPDATE_PROPOSAL', payload: proposal }),
  };
}

export function useContracts() {
  const { state, dispatch } = useData();
  return {
    contracts: state.contracts,
    addContract: (contract: Contract) =>
      dispatch({ type: 'ADD_CONTRACT', payload: contract }),
    updateContract: (contract: Contract) =>
      dispatch({ type: 'UPDATE_CONTRACT', payload: contract }),
  };
}
