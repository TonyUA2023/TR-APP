// src/utils/inspectUnderpinningTemplate.ts

import { pdfService } from '../services/pdfServiceDynamic';

export async function inspectUnderpinningTemplate() {
  await pdfService.inspectTemplate('3UNDERPINNING.pdf');
}

// Llama esta función donde necesites para ver los campos del PDF