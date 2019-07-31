import { UserskillsPipe } from './userskills.pipe';
import { UserdetailServiceService } from '../userdetail-service.service';

describe('UserskillsPipe', () => {
  let uservice:UserdetailServiceService;
  it('create an instance', () => {
    const pipe = new UserskillsPipe(uservice);
    expect(pipe).toBeTruthy();
  });
});
