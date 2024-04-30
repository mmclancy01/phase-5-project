"""empty message

Revision ID: f07cc7b46a95
Revises: b04c4a4b9614
Create Date: 2024-04-25 18:17:05.244636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f07cc7b46a95'
down_revision = 'b04c4a4b9614'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teetimes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=False))
        batch_op.add_column(sa.Column('time', sa.Time(), nullable=False))
        batch_op.drop_column('start_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teetimes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.DATETIME(), nullable=False))
        batch_op.drop_column('time')
        batch_op.drop_column('date')

    # ### end Alembic commands ###
