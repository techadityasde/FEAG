import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Package {
  id: string;
  title: string;
  duration: string;
  price: number;
  features: string[];
  enabled: boolean;
}

interface PackageState {
  calculatedCustomPrice: number;
  packages: Package[];
}

const initialState: PackageState = {
  calculatedCustomPrice: 0,
  packages: [],
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setCalculatedCustomPrice(state, action: PayloadAction<number>) {
      state.calculatedCustomPrice = action.payload;
    },
    setPackages(state, action: PayloadAction<Package[]>) {
      state.packages = action.payload;
    },
    updatePackage(state, action: PayloadAction<Package>) {
      const index = state.packages.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.packages[index] = action.payload;
      }
    },
    togglePackageStatus(state, action: PayloadAction<{ id: string; enabled: boolean }>) {
      const pkg = state.packages.find((p) => p.id === action.payload.id);
      if (pkg) {
        pkg.enabled = action.payload.enabled;
      }
    },
  },
});

export const { setCalculatedCustomPrice, setPackages, updatePackage, togglePackageStatus } = packageSlice.actions;
export default packageSlice.reducer;
