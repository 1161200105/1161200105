import numpy as np
import csv
import matplotlib.pyplot as plt



#data = []
test = []

def readdata(device_name,date):
    path = 'uftp\\public\\' + str(device_name) + '\\data\\'+device_name+'_'+str(date)+'.csv'
    data = []
    with open(path,'r') as f:
        reader = csv.reader(f)
        
        for row in reader:
            row[0] = row[0].replace('_',' ')
            
            row[1] = round(float(row[1]),1)
            row[2] = round(float(row[2]),1)
            row[3] = int(row[3])
            row[4] = int(row[4])
            data.append(row[1:])
    return data

data_1 = readdata('G2D1','2020-02-02')
data_2 = readdata('G2D2','2020-02-02')
data_3 = readdata('G2D3','2020-02-02')
data_4 = readdata('G2D4','2020-02-02')

def plot(data,label):
#    temp = np.array(data)
#    t = np.linspace(1,temp.shape[0],temp.shape[0])
#    print(temp)
#    plt.plot(t,temp[:,0],label = label)
    t = [i for i in range(len(data))]
    plt.plot(t,data,label = label)
    plt.legend()
    

#plot(data,'average')

data_1 = np.array(data_1)[:,0]
data_2 = np.array(data_2)[:,0]
data_3 = np.array(data_3)[:,0]
data_4 = np.array(data_4)[:,0]

length = min(len(data_1),len(data_2),len(data_3),len(data_4))
t = [i for i in range(length)]

plt.plot(t,data_1,linewidth=0.5,label = 'G2D1')
plt.plot(t,data_2,linewidth=0.5,label = 'G2D2')
plt.plot(t,data_3,linewidth=0.5,label = 'G2D3')
plt.plot(t,data_4,linewidth=0.5,label = 'G2D4')

v_avg = 0
data_avg = []
for i in range(length):
    data_avg_ = (data_1[i] + data_2[i] + data_3[i] + data_4[i])/4
    data_avg.append(data_avg_)
    v_avg += (data_avg_ - data_1[i])**2 + (data_avg_ - data_2[i])**2
    v_avg += (data_avg_ - data_3[i])**2 + (data_avg_ - data_4[i])**2
#plt.plot(data_avg,linewidth=1.5,color = 'red',label = 'average')
print('average:%f' % v_avg)



def fusion_fumula(x,y):
    c = 1.001
    z = c*(x+y)+x*y*(c-1)**2
    z = z / (1+(c)**2 - (c-1)**2 *(x+y-2*x*y))
    return z

max_ = 100
def fusion(data):
    len_data = len(data)
    d = []
    if (len_data == 1):
        return data[0]
    elif (len_data > 1):
        d = [[max_ for i in range(len_data)] for j in range(len_data)]
        for i in range(len_data):
            for j in range(i + 1, len_data):
                d[i][j] = abs(data[i] - data[j])
        d = np.array(d)
#        print(d)
        index = d.argmin()
        x = index // len_data
        y = index % len_data
        
        #融合x和y        
        z = fusion_fumula(data[x],data[y])
        
        data_ = []
        for i in range(len_data):
            if i == x or i == y:
                continue
            data_.append(data[i])
        data_.append(z)
#        print(data_)
        return fusion(data_)

v_fusion = 0
data_fusion = []
for i in range(length):
    data_ = [data_1[i],data_2[i],data_3[i],data_4[i]]
    data_fusion_ = fusion(data_)
    data_fusion.append(data_fusion_)
    v_fusion += (data_fusion_ - data_1[i])**2 + (data_fusion_ - data_2[i])**2
    v_fusion += (data_fusion_ - data_3[i])**2 + (data_fusion_ - data_4[i])**2
print('fusion:%f' % v_fusion)
plt.plot(t,data_fusion,label = 'fusion')


plt.legend()
plt.show()