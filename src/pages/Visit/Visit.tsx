import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const VisitsPage = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent className='max-w-full max-h-screen'>
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
                    { date: '15-01-2025', doctor: 'Dr. Smith', amount: '100' },
                    { date: '10-01-2025', doctor: 'Dr. Johnson', amount: '200' },
                    { date: '02-01-2025', doctor: 'Dr. Brown', amount: '300' },
                  ].map((visit, index) => (
                    <tr
                      key={index}
                      className='hover:bg-gray-100 cursor-pointer border-b-2 border-gray-200'
                    >
                      <td className='p-2'>{visit.date}</td>
                      <td className='p-2'>{visit.doctor}</td>
                      <td className='p-2'>{visit.amount}</td>
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
              <p className='w-full bg-blue-200 ps-4 py-2'>Ngày: 15-01-2025</p>
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
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin về dịch vụ</CardTitle>
                </CardHeader>
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitsPage;
