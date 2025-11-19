import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Hr,
} from '@react-email/components';
import { Card, CardHeader, InfoRow } from './components/Card';

const BorrowReceiptEmail = ({
  borrowerName = 'John Doe',
  borrowerId = '',
  requestId = 'REQ-001',
  requestDate = new Date().toISOString(),
  expectedReturnDate = '',
  purpose = '',
  authorizedStudents = [],
  requestedItems = [],
  assignedItems = [],
  adminNotes = '',
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, padding: 0, backgroundColor: '#f9fafb' }}>
        <Container style={{ maxWidth: '600px', margin: '20px auto', padding: 0, backgroundColor: '#ffffff' }}>
          {/* Header */}
          <Section
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              padding: '30px',
              textAlign: 'center',
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Text
              style={{
                color: '#ffffff',
                fontSize: '28px',
                margin: '0 0 10px 0',
                fontWeight: '600',
              }}
            >
              Borrow Request Receipt
            </Text>
            <Text
              style={{
                color: '#e0e7ff',
                fontSize: '14px',
                margin: '0',
              }}
            >
              ToolShare System
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={{ padding: '20px', backgroundColor: '#ffffff' }}>
            {/* Request Information Card */}
            <Card>
              <CardHeader
                title="Request Information"
                subtitle="Review request details"
              />

              <InfoRow label="Request #:" value={requestId} />
              <InfoRow
                label="Borrower:"
                value={`${borrowerName}${borrowerId ? ` (${borrowerId})` : ''}`}
              />
              <InfoRow label="Request Date:" value={formatDate(requestDate)} />
              {expectedReturnDate && (
                <InfoRow
                  label="Expected Return Date:"
                  value={formatDate(expectedReturnDate)}
                  valueColor="#3b82f6"
                />
              )}

              {/* Purpose */}
              {purpose && (
                <>
                  <Hr style={{ borderColor: '#e5e7eb', margin: '15px 0' }} />
                  <Row>
                    <Column>
                      <Text
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                        }}
                      >
                        Purpose:
                      </Text>
                      <div
                        style={{
                          margin: '0',
                          fontSize: '13px',
                          color: '#1f2937',
                          backgroundColor: '#f9fafb',
                          padding: '12px',
                          borderRadius: '6px',
                          lineHeight: '1.5',
                        }}
                      >
                        {purpose}
                      </div>
                    </Column>
                  </Row>
                </>
              )}

              {/* Authorized Students */}
              {authorizedStudents && authorizedStudents.length > 0 && (
                <>
                  <Hr style={{ borderColor: '#e5e7eb', margin: '15px 0' }} />
                  <Row>
                    <Column>
                      <Text
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                        }}
                      >
                        Authorized Students:
                      </Text>
                      {authorizedStudents.map((student, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: index < authorizedStudents.length - 1 ? '8px' : '0',
                          }}
                        >
                          <p
                            style={{
                              margin: '0 0 4px 0',
                              fontSize: '13px',
                              fontWeight: '600',
                              color: '#1f2937',
                            }}
                          >
                            Name: {student.name}
                          </p>
                          <p
                            style={{
                              margin: '0',
                              fontSize: '11px',
                              color: '#6b7280',
                            }}
                          >
                            Student ID: {student.student_id}
                          </p>
                        </div>
                      ))}
                    </Column>
                  </Row>
                </>
              )}

              {/* Admin Notes */}
              {adminNotes && (
                <>
                  <Hr style={{ borderColor: '#e5e7eb', margin: '15px 0' }} />
                  <Row>
                    <Column>
                      <Text
                        style={{
                          margin: '0 0 8px 0',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#6b7280',
                        }}
                      >
                        Admin Notes:
                      </Text>
                      <div
                        style={{
                          margin: '0',
                          fontSize: '13px',
                          color: '#1f2937',
                          backgroundColor: '#f9fafb',
                          padding: '12px',
                          borderRadius: '6px',
                          lineHeight: '1.5',
                        }}
                      >
                        {adminNotes}
                      </div>
                    </Column>
                  </Row>
                </>
              )}
            </Card>

            {/* Requested Items Card */}
            <Card>
              <CardHeader
                title={`Requested Items (${requestedItems?.length || 0})`}
                subtitle="Items in this request"
              />

              {requestedItems && requestedItems.length > 0 ? (
                requestedItems.map((item, index) => (
                  <div key={index}>
                    <table cellPadding="0" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '12px 0', verticalAlign: 'middle' }}>
                            <h4
                              style={{
                                margin: '0 0 5px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1f2937',
                              }}
                            >
                              {item.name}
                            </h4>
                            <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>
                              {item.category || 'N/A'}
                            </p>
                          </td>
                          <td style={{ padding: '12px 0', textAlign: 'right', verticalAlign: 'middle' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                              {item.quantity}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {item.unitOfMeasure || 'units'}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {index < requestedItems.length - 1 && (
                      <Hr style={{ borderColor: '#e5e7eb', margin: '0' }} />
                    )}
                  </div>
                ))
              ) : (
                <Text style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                  No items requested
                </Text>
              )}
            </Card>

            {/* Assigned Items Card */}
            {assignedItems && assignedItems.length > 0 && (
              <Section
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '20px',
                  marginTop: '20px',
                }}
              >
                <Row>
                  <Column>
                    <h3
                      style={{
                        margin: '0 0 4px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#166534',
                      }}
                    >
                      Assigned Items ({assignedItems.length})
                    </h3>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#16a34a' }}>
                      Items assigned to your request
                    </p>
                  </Column>
                </Row>

                {assignedItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: index < assignedItems.length - 1 ? '8px' : '0',
                    }}
                  >
                    <h4
                      style={{
                        margin: '0 0 8px 0',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#166534',
                      }}
                    >
                      {item.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                        }}
                      >
                        Property #: {item.propertyNo || 'N/A'}
                      </span>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                        }}
                      >
                        {item.condition || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </Section>
            )}

            {/* Footer */}
            <Section
              style={{
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '30px',
              }}
            >
              <Text style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 5px 0' }}>
                Thank you for using ToolShare!
              </Text>
              <Text style={{ fontSize: '13px', color: '#6b7280', margin: '0' }}>
                For assistance, please contact the administrator.
              </Text>
              <Text
                style={{
                  fontSize: '14px',
                  color: '#3b82f6',
                  fontWeight: '600',
                  margin: '10px 0 0 0',
                }}
              >
                ToolShare Team
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BorrowReceiptEmail;
