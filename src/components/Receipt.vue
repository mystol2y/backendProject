<template>
  <div class="Receipt">
     <div>
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
                    <i class="bi bi-justify fs-3"></i>
                </a>
            </header>

            <div class="page-heading">
                <h3>ใบเสร็จ</h3>
            </div>
            <div class="page-content">
                <section class="row">
                   <div class="card m-0 p-0">
                       <div class="table-responsive">
                       <table class="table table-borderless">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">ชื่อลูกค้า</th>
                            <th scope="col">รายละเอียดที่อยู่</th>
                            <th scope="col">สำนักงาน/สาขาเลขที่</th>
                            <th scope="col">วันที่สร้าง</th>
                            <th scope="col">จำนวนเงิน</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td scope="row">วสันต์ธร ไชยหนองแข้</td>
                            <td>163 หมู่ 4 ตำบลหนองอีบุตร อำเภอห้วยผึ้ง จังหวัดกาฬสินธุ์</td>
                            <td>กาฬสินธุ์</td>
                            <td>16-02-2564</td>
                            <td>xxxxxx</td>
                            <td>ยังไม่ได้ชำระ</td>
                            <td>
                                <button class="btn btn-primary "><i class="fas fa-trash mr-1"></i>ลบ</button>
                                <button type="button" class="btn btn-primary mr-1"><i class="fas fa-print mr-1"></i>พิมพ์เอกสาร</button>
                                <button type="button" class="btn btn-primary "><i class="fas fa-download mr-1"></i>ดาวน์โหลด</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                   </div>
                   </div>
                   
                </section>
            </div>

        </div>
  </div>
</template>

<script>
export default {
    name: 'Receipt'
}
</script>

<style scoped>
td button {
        margin-left: 10px;
    }
</style>