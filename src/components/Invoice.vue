<template>
  <div class="Invoice">
    <div>
            <header class="mb-3">
                <a href="#" class="burger-btn d-block d-xl-none">
                    <i class="bi bi-justify fs-3"></i>
                </a>
            </header>

            <div class="page-heading d-flex justify-content-around">
                <h3>ใบเเจ้งหนี้</h3>
                <div class="right-menu">
                    <button class="btn btn-primary"><i class="fas fa-save mr-1"></i>บันทึกเอกสาร</button>
                </div>
            </div>
            <div class="page-content container">
                <section class="row">
                   <div class="card m-0 p-0">
                      <form class="p-5 text-left ">
                          <div class="d-flex justify-content-around">
                          <div class="left-data">
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">ชื่อลูกค้า</label>
                            <select class="form-select" aria-label="Default select example">
                            <option selected>เลือกชื่อลูกค้า</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                            <label for="exampleInputEmail1" class="form-label">รายละเอียด</label>
                            <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px"></textarea>
                            <label for="floatingTextarea2">รายละเอียดที่อยู่</label>
                            <div>
                            <input type="email" class="form-control" id="exampleInputEmail12" placeholder="เลขประจำตัวผู้เสียภาษี">
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="สำนักงาน/สาขาเลขที่">
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="right-data ">
                        <div class="mb-3">
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary mr-1"><i class="fas fa-print mr-1"></i>พิมพ์เอกสาร</button>
                                <button type="button" class="btn btn-primary "><i class="fas fa-download mr-1"></i>ดาวน์โหลด</button>
                            </div>
                            <label class="form-label">จำนวนเงินรวมทั้งสิ้น</label>
                            <h3 class="form-label">0.00</h3>
                            <div>
                                <label for="example-datepicker">วันที่</label>
                                <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
                            </div>
                            <label class="form-label">เครดิต (วัน)</label>
                            <select class="form-select" aria-label="Default select example">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                            <div>
                                <label for="example-datepicker">ครบกำหนด</label>
                                <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                          </div>
                          </div>
                        </form>
                   </div>
                </section>
            </div>

        </div>
  </div>
</template>

<script>

export default {
    name: 'Invoice',
    
}
</script>

<style scoped>
.left-data,
.right-data  {
    width: 500px;
}
</style>