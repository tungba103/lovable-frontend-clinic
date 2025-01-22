import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerModal = ({ open, onOpenChange }: CustomerModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-full'>
        <DialogHeader className=''>
          <DialogTitle className='mb-2'>Bá Thanh Tùng (0965899821)</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className='flex gap-4'>
          <div className='w-96'>
            <table className='w-full'>
              <thead className='bg-blue-200'>
                <tr>
                  <th className='text-left font-medium p-2'>Ngày đến</th>
                  <th className='text-left font-medium p-2'>Bác sĩ</th>
                  <th className='text-left font-medium p-2'>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '15-01-2025', doctor: 'Dr. Smith', amount: '100,000' },
                  { date: '10-01-2025', doctor: 'Dr. Johnson', amount: '200,000' },
                  { date: '02-01-2025', doctor: 'Dr. Brown', amount: '300,000' },
                ].map((visit, index) => (
                  <tr
                    key={index}
                    className='hover:bg-gray-100 cursor-pointer border-b-2 border-gray-200'
                  >
                    <td className='p-2'>{visit.date}</td>
                    <td className='p-2'>{visit.doctor}</td>
                    <td className='p-2'>{visit.amount} VND</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className='p-2'>Tổng tiền</td>
                  <td className='p-2'></td>
                  <td className='p-2'>1,000,000 VND</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='w-full'>
            <p className='w-full bg-blue-200 ps-4 py-2 mb-4'>Ngày: 15-01-2025</p>
            <div className='space-y-4 h-[calc(100vh-160px)] overflow-y-scroll'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin dành cho bác sĩ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex justify-start gap-4'>
                    <div className='w-96'>
                      <Label>Chẩn đoán</Label>
                      <Input
                        className='my-2'
                        placeholder='Chẩn đoán'
                      />
                    </div>
                    <div className='w-96'>
                      <Label>Triệu chứng chính</Label>
                      <Input
                        className='my-2'
                        placeholder='Triệu chứng chính'
                      />
                    </div>
                  </div>
                  <div className='w-96'>
                    <Label>Tiền sử bản thân/gia đình</Label>
                    <Input
                      className='my-2'
                      placeholder='Tiền sử bản thân/gia đình'
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin về đơn thuốc</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <div className='w-96'>
                        <Label>Chọn thuốc</Label>
                        <select className='w-full border rounded-md p-2'>
                          <option value=''>Chọn thuốc...</option>
                          <option value='med1'>Paracetamol 500mg</option>
                          <option value='med2'>Amoxicillin 250mg</option>
                          <option value='med3'>Omeprazole 20mg</option>
                        </select>
                      </div>
                      <Button className='self-end'>Thêm thuốc</Button>
                    </div>

                    <div className='border rounded-md'>
                      <table className='w-full'>
                        <thead className='bg-blue-50'>
                          <tr>
                            <th className='text-left p-2'>Tên thuốc</th>
                            <th className='text-left p-2'>Số lượng</th>
                            <th className='text-left p-2'>Đơn giá</th>
                            <th className='text-left p-2'>Thành tiền</th>
                            <th className='p-2'></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='border-t'>
                            <td className='p-2'>Paracetamol 500mg</td>
                            <td className='p-2'>
                              <Input
                                type='number'
                                min='1'
                                value='10'
                                className='w-20'
                              />
                            </td>
                            <td className='p-2'>5,000</td>
                            <td className='p-2'>50,000</td>
                            <td className='p-2 text-center'>
                              <Button
                                variant='ghost'
                                size='sm'
                              >
                                ×
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className='border-t'>
                          <tr>
                            <td
                              className='p-2 font-medium'
                              colSpan={3}
                            >
                              Tổng tiền:
                            </td>
                            <td className='p-2 font-medium'>50,000</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin về dịch vụ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex gap-4'>
                      <div className='w-96'>
                        <Label>Chọn dịch vụ</Label>
                        <select className='w-full border rounded-md p-2'>
                          <option value=''>Chọn dịch vụ...</option>
                          <option value='service1'>Khám tổng quát</option>
                          <option value='service2'>Siêu âm</option>
                          <option value='service3'>Xét nghiệm máu</option>
                        </select>
                      </div>
                      <Button className='self-end'>Thêm dịch vụ</Button>
                    </div>

                    <div className='border rounded-md'>
                      <table className='w-full'>
                        <thead className='bg-blue-50'>
                          <tr>
                            <th className='text-left p-2'>Tên dịch vụ</th>
                            <th className='text-left p-2'>Số lượng</th>
                            <th className='text-left p-2'>Đơn giá</th>
                            <th className='text-left p-2'>Thành tiền</th>
                            <th className='p-2'></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='border-t'>
                            <td className='p-2'>Khám tổng quát</td>
                            <td className='p-2'>
                              <Input
                                type='number'
                                min='1'
                                value='1'
                                className='w-20'
                              />
                            </td>
                            <td className='p-2'>100,000</td>
                            <td className='p-2'>100,000</td>
                            <td className='p-2 text-center'>
                              <Button
                                variant='ghost'
                                size='sm'
                              >
                                ×
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className='border-t'>
                          <tr>
                            <td
                              className='p-2 font-medium'
                              colSpan={3}
                            >
                              Tổng tiền:
                            </td>
                            <td className='p-2 font-medium'>100,000</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tái khám</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex justify-start gap-4'>
                    <div className='w-96'>
                      <Label>Ngày tái khám</Label>
                      <Input
                        className='my-2'
                        placeholder='Ngày tái khám'
                        type='date'
                      />
                    </div>
                    <div className='w-96'>
                      <Label>Lời dặn</Label>
                      <Input
                        className='my-2'
                        placeholder='Lời dặn'
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button>
                <span>Hoàn tất lượt khám</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;
