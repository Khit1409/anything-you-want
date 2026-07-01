import { Body, Controller, Put } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { HelperService } from '@/modules/common/services/helper.service';
import { CancelPaymentDto } from '../dtos/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly helperService: HelperService,
  ) {}

  @Put('cancel')
  async cancelPayment(@Body() dto: CancelPaymentDto) {
    const result = await this.paymentService.cancelPayment(dto);
    return this.helperService.responseConfig({
      success: result,
      message: result
        ? 'Hủy thành công thanh toán!'
        : 'Hủy thanh toán thất bại, thử lại!',
    });
  }
}
