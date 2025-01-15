import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const VisitsPage = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent className='max-w-full max-h-screen'>
          <DialogHeader>
            <DialogTitle>Bá Thanh Tùng (0965899821)</DialogTitle>
          </DialogHeader>
          <div></div>
          <div className='flex gap-4'>
            <Card className='w-96'>
              <CardHeader>
                <CardTitle>Lịch sử đến</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <div className='w-full'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin</CardTitle>
                </CardHeader>
                <CardContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin lượt khám</CardTitle>
                    </CardHeader>
                  </Card>
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
                  </Card>
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
