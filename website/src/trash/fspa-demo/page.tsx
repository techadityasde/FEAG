import React from 'react';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FSPA Algorithm Demo | FEAG',
  description: 'Executive dashboard demonstrating the Future Service Pricing Algorithm.',
};

export default function FSPADemoPage() {
  return <ExecutiveDashboard />;
}
