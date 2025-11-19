import { Section, Row, Column } from '@react-email/components';

export const Card = ({ children }) => (
  <Section
    style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}
  >
    {children}
  </Section>
);

export const CardHeader = ({ title, subtitle }) => (
  <>
    <Row>
      <Column>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
          {title}
        </h3>
        <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>{subtitle}</p>
      </Column>
    </Row>
    <Row>
      <Column>
        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '15px', paddingTop: '15px' }} />
      </Column>
    </Row>
  </>
);

export const InfoRow = ({ icon, label, value, valueColor = '#1f2937' }) => (
  <Row style={{ marginBottom: '8px' }}>
    <Column>
      <table cellPadding="0" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>{icon}</td>
            <td style={{ paddingLeft: '12px', fontSize: '13px', color: '#6b7280' }}>{label}</td>
            <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: '600', color: valueColor }}>
              {value}
            </td>
          </tr>
        </tbody>
      </table>
    </Column>
  </Row>
);
