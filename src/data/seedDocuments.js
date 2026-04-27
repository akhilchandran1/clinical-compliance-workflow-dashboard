const now = new Date()
const isoOffset = (daysOffset = 0) => new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000).toISOString()
const dateOffset = (daysOffset = 0) => new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

function toIso(value) {
  if (!value) return null
  if (typeof value === 'string' && value.includes('T')) return value
  return `${value}T09:00:00.000Z`
}

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
  submittedAt = null,
  reviewedAt = null,
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
    dueDate: dateOffset(dueOffset),
    lastUpdated: isoOffset(updatedOffset),
    submittedAt: toIso(submittedAt),
    reviewedAt: toIso(reviewedAt),
    reviewerComment,
    createdAt: isoOffset(createdOffset),
    updatedAt: isoOffset(updatedOffset),
  }
}

export const seedDocuments = [
  // Draft (4)
  makeDocument({ id: 'DOC-0001', studyId: 'ST-0007', name: 'Study Protocol Draft - ECG Feasibility', type: 'Protocol', version: '0.9', status: 'Draft', dueOffset: 12, createdOffset: -18, updatedOffset: -2 }),
  makeDocument({ id: 'DOC-0002', studyId: 'ST-0010', name: 'User Requirements Specification Draft', type: 'Training Record', version: '0.4', status: 'Draft', dueOffset: 9, createdOffset: -14, updatedOffset: -1 }),
  makeDocument({ id: 'DOC-0003', studyId: 'ST-0003', name: 'Site Agreement Form Draft', type: 'Site Agreement', version: '0.7', status: 'Draft', dueOffset: 5, createdOffset: -11, updatedOffset: -1 }),
  makeDocument({ id: 'DOC-0004', studyId: 'ST-0015', name: 'Monitoring Plan Draft', type: 'Safety Report', version: '0.5', status: 'Draft', dueOffset: 15, createdOffset: -8, updatedOffset: -1 }),

  // Submitted (7)
  makeDocument({ id: 'DOC-0005', studyId: 'ST-0001', name: 'Informed Consent Form Revision', type: 'Informed Consent Form', version: '1.3', status: 'Submitted', dueOffset: 3, createdOffset: -24, updatedOffset: -4, submittedAt: '2026-04-22T10:00:00.000Z' }),
  makeDocument({ id: 'DOC-0006', studyId: 'ST-0002', name: 'Ethics Committee Letter Addendum', type: 'Ethics Approval Letter', version: '1.1', status: 'Submitted', dueOffset: 2, createdOffset: -20, updatedOffset: -3, submittedAt: '2026-04-23T09:00:00.000Z' }),
  makeDocument({ id: 'DOC-0007', studyId: 'ST-0006', name: 'Training Record - Home Nurse Team', type: 'Training Record', version: '2.0', status: 'Submitted', dueOffset: 6, createdOffset: -26, updatedOffset: -2, submittedAt: '2026-04-24T11:20:00.000Z' }),
  makeDocument({ id: 'DOC-0008', studyId: 'ST-0013', name: 'AI Triage Workflow Package', type: 'Protocol', version: '1.0', status: 'Submitted', dueOffset: 1, createdOffset: -18, updatedOffset: -5, submittedAt: '2026-04-21T15:30:00.000Z' }),
  makeDocument({ id: 'DOC-0009', studyId: 'ST-0014', name: 'Risk Management Summary', type: 'Safety Report', version: '1.2', status: 'Submitted', dueOffset: 4, createdOffset: -21, updatedOffset: -2, submittedAt: '2026-04-24T08:40:00.000Z' }),
  makeDocument({ id: 'DOC-0010', studyId: 'ST-0016', name: 'Data Management Plan', type: 'Site Agreement', version: '1.0', status: 'Submitted', dueOffset: 7, createdOffset: -19, updatedOffset: -1, submittedAt: '2026-04-25T10:10:00.000Z' }),
  makeDocument({ id: 'DOC-0011', studyId: 'ST-0005', name: 'Clinical Evaluation Summary', type: 'Investigator Brochure', version: '1.1', status: 'Submitted', dueOffset: 10, createdOffset: -13, updatedOffset: -1, submittedAt: '2026-04-25T14:00:00.000Z' }),

  // Under Review (3)
  makeDocument({ id: 'DOC-0012', studyId: 'ST-0002', name: 'Oncology Trial Protocol Update', type: 'Protocol', version: '1.4', status: 'Under Review', dueOffset: 0, createdOffset: -31, updatedOffset: -6, submittedAt: '2026-04-18T09:30:00.000Z', reviewedAt: '2026-04-02T11:00:00.000Z', reviewerComment: 'Returned once, awaiting final QA sign-off.' }),
  makeDocument({ id: 'DOC-0013', studyId: 'ST-0015', name: 'Rehabilitation Sensor Validation Notes', type: 'Safety Report', version: '1.0', status: 'Under Review', dueOffset: -1, createdOffset: -28, updatedOffset: -7, submittedAt: '2026-04-17T12:10:00.000Z', reviewedAt: '2026-04-05T09:20:00.000Z', reviewerComment: 'Second-round review in progress.' }),
  makeDocument({ id: 'DOC-0014', studyId: 'ST-0003', name: 'Deviation Management Guide', type: 'Protocol', version: '1.2', status: 'Under Review', dueOffset: 2, createdOffset: -24, updatedOffset: -5, submittedAt: '2026-04-19T10:40:00.000Z' }),

  // Approved (12)
  makeDocument({ id: 'DOC-0015', studyId: 'ST-0001', name: 'Study Protocol', type: 'Protocol', version: '2.0', status: 'Approved', dueOffset: 20, createdOffset: -60, updatedOffset: -12, submittedAt: '2025-11-08T10:00:00.000Z', reviewedAt: '2025-11-14T10:00:00.000Z', reviewerComment: 'Approved for active phase use.' }),
  makeDocument({ id: 'DOC-0016', studyId: 'ST-0008', name: 'Investigator Brochure', type: 'Investigator Brochure', version: '3.0', status: 'Approved', dueOffset: 25, createdOffset: -58, updatedOffset: -14, submittedAt: '2025-12-01T10:00:00.000Z', reviewedAt: '2025-12-05T10:20:00.000Z', reviewerComment: 'QA checks complete.' }),
  makeDocument({ id: 'DOC-0017', studyId: 'ST-0009', name: 'Site Agreement Form', type: 'Site Agreement', version: '1.0', status: 'Approved', dueOffset: 30, createdOffset: -55, updatedOffset: -18, submittedAt: '2025-12-09T09:00:00.000Z', reviewedAt: '2025-12-18T13:00:00.000Z', reviewerComment: 'Legal and compliance approved.' }),
  makeDocument({ id: 'DOC-0018', studyId: 'ST-0004', name: 'Ethics Committee Letter', type: 'Ethics Approval Letter', version: '1.0', status: 'Approved', dueOffset: 22, createdOffset: -52, updatedOffset: -15, submittedAt: '2026-01-07T11:00:00.000Z', reviewedAt: '2026-01-15T11:30:00.000Z', reviewerComment: 'Document complete and approved.' }),
  makeDocument({ id: 'DOC-0019', studyId: 'ST-0006', name: 'Safety Report - RPM Baseline', type: 'Safety Report', version: '2.2', status: 'Approved', dueOffset: 18, createdOffset: -49, updatedOffset: -13, submittedAt: '2026-02-01T10:30:00.000Z', reviewedAt: '2026-02-04T10:15:00.000Z', reviewerComment: 'Findings reviewed and accepted.' }),
  makeDocument({ id: 'DOC-0020', studyId: 'ST-0012', name: 'Training Record - Study Coordinators', type: 'Training Record', version: '1.5', status: 'Approved', dueOffset: 14, createdOffset: -45, updatedOffset: -9, submittedAt: '2026-02-09T09:30:00.000Z', reviewedAt: '2026-02-12T09:40:00.000Z', reviewerComment: 'Training evidence accepted.' }),
  makeDocument({ id: 'DOC-0021', studyId: 'ST-0016', name: 'Participant Information Sheet', type: 'Informed Consent Form', version: '1.8', status: 'Approved', dueOffset: 16, createdOffset: -43, updatedOffset: -10, submittedAt: '2026-02-18T08:30:00.000Z', reviewedAt: '2026-02-25T14:00:00.000Z', reviewerComment: 'Approved after content alignment.' }),
  makeDocument({ id: 'DOC-0022', studyId: 'ST-0014', name: 'Protocol Synopsis Final', type: 'Protocol', version: '1.6', status: 'Approved', dueOffset: 24, createdOffset: -40, updatedOffset: -11, submittedAt: '2026-03-01T11:00:00.000Z', reviewedAt: '2026-03-03T11:30:00.000Z', reviewerComment: 'Ready for stakeholder distribution.' }),
  makeDocument({ id: 'DOC-0023', studyId: 'ST-0014', name: 'Monitoring Plan - Home Monitoring', type: 'Safety Report', version: '1.0', status: 'Approved', dueOffset: 19, createdOffset: -38, updatedOffset: -8, submittedAt: '2026-03-08T11:20:00.000Z', reviewedAt: '2026-03-10T09:10:00.000Z', reviewerComment: 'Approved by QA reviewer.' }),
  makeDocument({ id: 'DOC-0024', studyId: 'ST-0001', name: 'Device Validation Report', type: 'Training Record', version: '1.1', status: 'Approved', dueOffset: 21, createdOffset: -36, updatedOffset: -7, submittedAt: '2026-03-12T14:00:00.000Z', reviewedAt: '2026-03-17T10:50:00.000Z', reviewerComment: 'Validation package approved.' }),
  makeDocument({ id: 'DOC-0025', studyId: 'ST-0005', name: 'Risk Management Summary - Oncology', type: 'Site Agreement', version: '1.2', status: 'Approved', dueOffset: 17, createdOffset: -34, updatedOffset: -6, submittedAt: '2026-03-20T09:00:00.000Z', reviewedAt: '2026-03-25T15:00:00.000Z', reviewerComment: 'Metadata verified.' }),
  makeDocument({ id: 'DOC-0026', studyId: 'ST-0013', name: 'Software Verification Summary', type: 'Training Record', version: '2.1', status: 'Approved', dueOffset: 13, createdOffset: -32, updatedOffset: -5, submittedAt: '2026-04-01T10:00:00.000Z', reviewedAt: '2026-04-08T10:00:00.000Z', reviewerComment: 'Approved and published.' }),

  // Rejected (2)
  makeDocument({ id: 'DOC-0027', studyId: 'ST-0002', name: 'Safety Escalation Template', type: 'Safety Report', version: '0.9', status: 'Rejected', dueOffset: 1, createdOffset: -18, updatedOffset: -4, submittedAt: '2026-04-09T09:00:00.000Z', reviewedAt: '2026-04-14T13:00:00.000Z', reviewerComment: 'Please add escalation matrix details.' }),
  makeDocument({ id: 'DOC-0028', studyId: 'ST-0003', name: 'Protocol Deviation Log', type: 'Protocol', version: '1.0', status: 'Rejected', dueOffset: -3, createdOffset: -15, updatedOffset: -3, submittedAt: '2026-04-10T11:00:00.000Z', reviewedAt: '2026-04-20T09:00:00.000Z', reviewerComment: 'Version history is incomplete.' }),

  // Expired (1)
  makeDocument({ id: 'DOC-0029', studyId: 'ST-0011', name: 'Post-Market Follow-up Plan', type: 'Informed Consent Form', version: '0.8', status: 'Expired', dueOffset: -20, createdOffset: -120, updatedOffset: -40, submittedAt: '2026-04-06T08:00:00.000Z', reviewedAt: '2026-04-25T09:00:00.000Z', reviewerComment: 'Superseded by revised follow-up plan.' }),
]
