const now = new Date()
const iso = (daysOffset = 0) => new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000).toISOString()
const date = (daysOffset = 0) => new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

function makeDocument({
  id,
  studyId,
  name,
  type,
  version,
  status,
  dueOffset,
  createdOffset,
  updatedOffset,
  submittedOffset = null,
  reviewedOffset = null,
  reviewerComment = '',
  owner = 'Researcher',
}) {
  return {
    id,
    studyId,
    name,
    type,
    version,
    owner,
    status,
    dueDate: date(dueOffset),
    lastUpdated: iso(updatedOffset),
    submittedAt: submittedOffset === null ? null : iso(submittedOffset),
    reviewedAt: reviewedOffset === null ? null : iso(reviewedOffset),
    reviewerComment,
    createdAt: iso(createdOffset),
    updatedAt: iso(updatedOffset),
  }
}

export const seedDocuments = [
  // Draft (4)
  makeDocument({ id: 'DOC-0001', studyId: 'ST-0001', name: 'Protocol Amendment Draft', type: 'Protocol', version: '0.9', status: 'Draft', dueOffset: 12, createdOffset: -20, updatedOffset: -2 }),
  makeDocument({ id: 'DOC-0002', studyId: 'ST-0002', name: 'QA Checklist Draft', type: 'Training Record', version: '0.4', status: 'Draft', dueOffset: 9, createdOffset: -14, updatedOffset: -1 }),
  makeDocument({ id: 'DOC-0003', studyId: 'ST-0003', name: 'Site Feasibility Notes', type: 'Site Agreement', version: '0.7', status: 'Draft', dueOffset: 5, createdOffset: -10, updatedOffset: -1 }),
  makeDocument({ id: 'DOC-0004', studyId: 'ST-0001', name: 'Safety Signal Memo Draft', type: 'Safety Report', version: '0.5', status: 'Draft', dueOffset: 15, createdOffset: -8, updatedOffset: -1 }),

  // Submitted (7)
  makeDocument({ id: 'DOC-0005', studyId: 'ST-0001', name: 'Informed Consent Revision', type: 'Informed Consent Form', version: '1.3', status: 'Submitted', dueOffset: 3, createdOffset: -22, updatedOffset: -4, submittedOffset: -4 }),
  makeDocument({ id: 'DOC-0006', studyId: 'ST-0002', name: 'Ethics Clarification Letter', type: 'Ethics Approval Letter', version: '1.1', status: 'Submitted', dueOffset: 2, createdOffset: -18, updatedOffset: -3, submittedOffset: -3 }),
  makeDocument({ id: 'DOC-0007', studyId: 'ST-0002', name: 'Device Handling SOP', type: 'Training Record', version: '2.0', status: 'Submitted', dueOffset: 6, createdOffset: -26, updatedOffset: -2, submittedOffset: -2 }),
  makeDocument({ id: 'DOC-0008', studyId: 'ST-0003', name: 'Recruitment Material Package', type: 'Protocol', version: '1.0', status: 'Submitted', dueOffset: 1, createdOffset: -16, updatedOffset: -5, submittedOffset: -5 }),
  makeDocument({ id: 'DOC-0009', studyId: 'ST-0001', name: 'Monitoring Visit Plan', type: 'Safety Report', version: '1.2', status: 'Submitted', dueOffset: 4, createdOffset: -21, updatedOffset: -2, submittedOffset: -2 }),
  makeDocument({ id: 'DOC-0010', studyId: 'ST-0003', name: 'Site Delegation Log', type: 'Site Agreement', version: '1.0', status: 'Submitted', dueOffset: 7, createdOffset: -19, updatedOffset: -1, submittedOffset: -1 }),
  makeDocument({ id: 'DOC-0011', studyId: 'ST-0002', name: 'Investigator Meeting Notes', type: 'Investigator Brochure', version: '1.1', status: 'Submitted', dueOffset: 10, createdOffset: -11, updatedOffset: -1, submittedOffset: -1 }),

  // Under Review (3)
  makeDocument({ id: 'DOC-0012', studyId: 'ST-0001', name: 'Adverse Event Process SOP', type: 'Safety Report', version: '1.4', status: 'Under Review', dueOffset: 0, createdOffset: -30, updatedOffset: -6, submittedOffset: -9 }),
  makeDocument({ id: 'DOC-0013', studyId: 'ST-0002', name: 'Consent Translation Pack', type: 'Informed Consent Form', version: '1.0', status: 'Under Review', dueOffset: -1, createdOffset: -27, updatedOffset: -7, submittedOffset: -10 }),
  makeDocument({ id: 'DOC-0014', studyId: 'ST-0003', name: 'Deviation Management Guide', type: 'Protocol', version: '1.2', status: 'Under Review', dueOffset: 2, createdOffset: -24, updatedOffset: -5, submittedOffset: -8 }),

  // Approved (12)
  makeDocument({ id: 'DOC-0015', studyId: 'ST-0001', name: 'Study Protocol Final', type: 'Protocol', version: '2.0', status: 'Approved', dueOffset: 20, createdOffset: -60, updatedOffset: -12, submittedOffset: -20, reviewedOffset: -12, reviewerComment: 'Approved for active phase use.' }),
  makeDocument({ id: 'DOC-0016', studyId: 'ST-0001', name: 'Investigator Brochure v3', type: 'Investigator Brochure', version: '3.0', status: 'Approved', dueOffset: 25, createdOffset: -58, updatedOffset: -14, submittedOffset: -22, reviewedOffset: -14, reviewerComment: 'QA checks complete.' }),
  makeDocument({ id: 'DOC-0017', studyId: 'ST-0001', name: 'Site Agreement Signed Copy', type: 'Site Agreement', version: '1.0', status: 'Approved', dueOffset: 30, createdOffset: -55, updatedOffset: -18, submittedOffset: -26, reviewedOffset: -18, reviewerComment: 'Legal and compliance approved.' }),
  makeDocument({ id: 'DOC-0018', studyId: 'ST-0002', name: 'Ethics Approval Confirmation', type: 'Ethics Approval Letter', version: '1.0', status: 'Approved', dueOffset: 22, createdOffset: -52, updatedOffset: -15, submittedOffset: -24, reviewedOffset: -15, reviewerComment: 'Document complete and approved.' }),
  makeDocument({ id: 'DOC-0019', studyId: 'ST-0002', name: 'Safety Monitoring Report Q2', type: 'Safety Report', version: '2.2', status: 'Approved', dueOffset: 18, createdOffset: -49, updatedOffset: -13, submittedOffset: -21, reviewedOffset: -13, reviewerComment: 'Findings reviewed and accepted.' }),
  makeDocument({ id: 'DOC-0020', studyId: 'ST-0002', name: 'Training Completion Roster', type: 'Training Record', version: '1.5', status: 'Approved', dueOffset: 14, createdOffset: -45, updatedOffset: -9, submittedOffset: -17, reviewedOffset: -9, reviewerComment: 'Training evidence accepted.' }),
  makeDocument({ id: 'DOC-0021', studyId: 'ST-0003', name: 'Participant Information Sheet', type: 'Informed Consent Form', version: '1.8', status: 'Approved', dueOffset: 16, createdOffset: -43, updatedOffset: -10, submittedOffset: -18, reviewedOffset: -10, reviewerComment: 'Approved after content alignment.' }),
  makeDocument({ id: 'DOC-0022', studyId: 'ST-0003', name: 'Protocol Synopsis Final', type: 'Protocol', version: '1.6', status: 'Approved', dueOffset: 24, createdOffset: -40, updatedOffset: -11, submittedOffset: -19, reviewedOffset: -11, reviewerComment: 'Ready for stakeholder distribution.' }),
  makeDocument({ id: 'DOC-0023', studyId: 'ST-0001', name: 'Monitoring Tracker Baseline', type: 'Safety Report', version: '1.0', status: 'Approved', dueOffset: 19, createdOffset: -38, updatedOffset: -8, submittedOffset: -16, reviewedOffset: -8, reviewerComment: 'Approved by QA reviewer.' }),
  makeDocument({ id: 'DOC-0024', studyId: 'ST-0003', name: 'Site Readiness Checklist', type: 'Training Record', version: '1.1', status: 'Approved', dueOffset: 21, createdOffset: -36, updatedOffset: -7, submittedOffset: -15, reviewedOffset: -7, reviewerComment: 'Checklist complete and approved.' }),
  makeDocument({ id: 'DOC-0025', studyId: 'ST-0002', name: 'Regulatory Contact Matrix', type: 'Site Agreement', version: '1.2', status: 'Approved', dueOffset: 17, createdOffset: -34, updatedOffset: -6, submittedOffset: -14, reviewedOffset: -6, reviewerComment: 'Metadata verified.' }),
  makeDocument({ id: 'DOC-0026', studyId: 'ST-0001', name: 'Data Capture SOP', type: 'Training Record', version: '2.1', status: 'Approved', dueOffset: 13, createdOffset: -32, updatedOffset: -5, submittedOffset: -13, reviewedOffset: -5, reviewerComment: 'Approved and published.' }),

  // Rejected (2)
  makeDocument({ id: 'DOC-0027', studyId: 'ST-0002', name: 'Safety Escalation Template', type: 'Safety Report', version: '0.9', status: 'Rejected', dueOffset: 1, createdOffset: -18, updatedOffset: -4, submittedOffset: -8, reviewedOffset: -4, reviewerComment: 'Please add escalation matrix details.' }),
  makeDocument({ id: 'DOC-0028', studyId: 'ST-0003', name: 'Protocol Deviation Log', type: 'Protocol', version: '1.0', status: 'Rejected', dueOffset: -3, createdOffset: -15, updatedOffset: -3, submittedOffset: -7, reviewedOffset: -3, reviewerComment: 'Version history is incomplete.' }),

  // Expired (1)
  makeDocument({ id: 'DOC-0029', studyId: 'ST-0001', name: 'Legacy Consent Form', type: 'Informed Consent Form', version: '0.8', status: 'Expired', dueOffset: -20, createdOffset: -120, updatedOffset: -40, submittedOffset: -90, reviewedOffset: -85, reviewerComment: 'Superseded by revised consent form.' }),
]
