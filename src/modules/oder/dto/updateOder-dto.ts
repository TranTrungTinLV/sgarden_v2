import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderStatusDto {

  @ApiProperty({ example: 'CONFIRMED', description: 'Xac nhận đơn hàng' })
    status: string; // Trạng thái mới của đơn hàng
  @ApiProperty({description: 'cấp đểm cho thành viên khi dăng nhập', example:'1-5 là basic'})
    points: number; // Điểm thưởng nhập bởi admin
  }